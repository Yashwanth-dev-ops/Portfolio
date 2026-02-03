package api

import (
	"encoding/json"
	"fmt"
	"html"
	"net/http"
	"portfolio-backend/internal/config"
	"portfolio-backend/internal/database"
	"portfolio-backend/pkg/mailer"
)

type API struct {
	Mailer *mailer.Mailer
	Config *config.Config
}

func NewAPI(m *mailer.Mailer, cfg *config.Config) *API {
	return &API{Mailer: m, Config: cfg}
}

func (api *API) StatusHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status":  "ok",
		"message": "Cloud Architect Backend Running 🚀",
	})
}

// CVHandler serves the PDF file securely
func (api *API) CVHandler(w http.ResponseWriter, r *http.Request) {
	// Determine absolute path to assets.
	filePath := "assets/Nanda_Kishore_Pasupuleti.pdf"

	// Log the download attempt
	ip := r.RemoteAddr
	userAgent := r.UserAgent()
	// In a real scenario, we might want to extract the real IP from X-Forwarded-For if behind a proxy
	database.LogDownload(ip, userAgent, "INITIATED")

	// Set headers for download
	w.Header().Set("Content-Disposition", "attachment; filename=\"Nanda_Kishore_Pasupuleti.pdf\"")
	w.Header().Set("Content-Type", "application/pdf")

	http.ServeFile(w, r, filePath)
}

func (api *API) ContactHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	type ContactRequest struct {
		Name    string `json:"name"`
		Email   string `json:"email"`
		Message string `json:"message"`
	}

	var req ContactRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// 1. Send Notification to Admin (You)
	safeName := html.EscapeString(req.Name)
	safeEmail := html.EscapeString(req.Email)
	safeMessage := html.EscapeString(req.Message)

	notifySubject := fmt.Sprintf("New Portfolio Inquiry from %s", safeName)
	notifyBody := fmt.Sprintf("<h2>New Message</h2><p><b>Name:</b> %s</p><p><b>Email:</b> %s</p><p><b>Message:</b><br>%s</p>", safeName, safeEmail, safeMessage)

	// Fire and forget (or handle error if critical) regarding the admin notification?
	// Ideally we want to know if it fails.
	go api.Mailer.SendWithRetry([]string{api.Config.TargetEmail}, notifySubject, notifyBody)

	// 2. Send Auto-Reply to Sender
	replySubject := "Thank you for contacting Nanda Kishore"
	replyBody := fmt.Sprintf(`
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <p>Dear %s,</p>
            <p>Thank you for reaching out. I have received your message and will review it shortly.</p>
            <p>If you have any urgent inquiries, please feel free to follow up.</p>
            <br>
            <p>Best regards,</p>
            <p><strong>Nanda Kishore</strong><br>Senior Cloud Solution Architect</p>
        </div>
    `, req.Name)

	go api.Mailer.SendWithRetry([]string{req.Email}, replySubject, replyBody)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Transmission received. Auto-reply dispatched.",
	})
}
