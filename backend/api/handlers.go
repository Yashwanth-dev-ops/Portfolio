package api

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type StatusResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

func StatusHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*") // Allow all for dev
	json.NewEncoder(w).Encode(StatusResponse{
		Status:  "ok",
		Message: "Backend is running smoothly",
	})
}

func ContactHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Struct for decoding JSON body
	type ContactRequest struct {
		Name    string `json:"name"`
		Email   string `json:"email"`
		Message string `json:"message"`
	}

	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Decode JSON body
	var req ContactRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Mock processing: Log to console
	// In a real app, this would send an email or save to DB
	fmt.Printf("Received Contact Form:\nName: %s\nEmail: %s\nMessage: %s\n", req.Name, req.Email, req.Message)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Message received via Go backend!",
	})
}
