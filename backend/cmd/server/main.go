package main

import (
	"fmt"
	"log"
	"net/http"
	"portfolio-backend/internal/api"
	"portfolio-backend/internal/config"
	"portfolio-backend/internal/database"
	"portfolio-backend/pkg/loadbalancer"
	"portfolio-backend/pkg/mailer"
	"portfolio-backend/pkg/middleware"
)

func main() {
	// 1. Load Configuration
	cfg := config.LoadConfig()

	// 2. Initialize Database
	database.InitDB()

	// 3. Initialize Infrastructure
	// Simulating multiple backend instances for the Load Balancer
	_ = loadbalancer.NewLoadBalancer([]string{"http://localhost:8081", "http://localhost:8082"})

	// Initialize Mailer
	mail := mailer.NewMailer(cfg.SMTPHost, cfg.SMTPPort, cfg.SMTPUser, cfg.SMTPPass)

	// Initialize API Handlers
	app := api.NewAPI(mail, cfg)

	// 2. Setup Router
	mux := http.NewServeMux()

	// 4. Rate Limiter (5 req/min per IP)
	limiter := middleware.NewRateLimiter(5.0/60.0, 5)

	// 5. Register Handlers
	mux.HandleFunc("/api/status", app.StatusHandler)
	mux.HandleFunc("/api/contact", middleware.Limit(limiter)(http.HandlerFunc(app.ContactHandler)).ServeHTTP)
	mux.HandleFunc("/api/cv", app.CVHandler) // File Server

	// 6. Apply Middleware (Chain)
	// Logger -> CORS -> Router
	handler := middleware.Logger(middleware.EnableCORS(mux))

	// 5. Start Server
	port := ":8080"
	fmt.Printf("🚀 Cloud Architect Backend running on port %s\n", port)
	// fmt.Printf("⚖️  Load Balancer initialized with %d targets\n", 2) ignore for now as we aren't proxying requests yet

	if err := http.ListenAndServe(port, handler); err != nil {
		log.Fatal(err)
	}
}
