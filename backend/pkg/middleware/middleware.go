package middleware

import (
	"log"
	"net/http"
	"time"
)

// Logger is a structured logging middleware
func Logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		// Wrap ResponseWriter to capture status code
		WrappedWriter := &responseWriter{ResponseWriter: w, status: 200}

		next.ServeHTTP(WrappedWriter, r)

		latency := time.Since(start)

		// Structured Log Output
		log.Printf(
			"[REQUEST] %s | %s | Status: %d | Latency: %v | IP: %s | User-Agent: %s",
			r.Method,
			r.URL.Path,
			WrappedWriter.status,
			latency,
			r.RemoteAddr,
			r.UserAgent(),
		)
	})
}

// EnableCORS handles Cross-Origin Resource Sharing
func EnableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*") // For portfolio demo, allow all
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// responseWriter wrapper to capture status code
type responseWriter struct {
	http.ResponseWriter
	status int
}

func (rw *responseWriter) WriteHeader(code int) {
	rw.status = code
	rw.ResponseWriter.WriteHeader(code)
}
