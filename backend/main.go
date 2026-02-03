package main

import (
	"fmt"
	"log"
	"net/http"
	"portfolio-backend/api"
)

func main() {
	// Simple router
	http.HandleFunc("/api/status", api.StatusHandler)
	http.HandleFunc("/api/contact", api.ContactHandler)

	port := ":8080"
	fmt.Printf("Server starting on port %s...\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatal(err)
	}
}
