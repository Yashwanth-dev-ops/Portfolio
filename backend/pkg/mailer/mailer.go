package mailer

import (
	"fmt"
	"log"
	"net/smtp"
	"time"
)

type Mailer struct {
	Host     string
	Port     string
	Username string
	Password string
}

func NewMailer(host, port, user, pass string) *Mailer {
	return &Mailer{
		Host:     host,
		Port:     port,
		Username: user,
		Password: pass,
	}
}

// SendWithRetry attempts to send an email up to 3 times
func (m *Mailer) SendWithRetry(to []string, subject, body string) error {
	addr := fmt.Sprintf("%s:%s", m.Host, m.Port)
	auth := smtp.PlainAuth("", m.Username, m.Password, m.Host)

	msg := []byte(fmt.Sprintf("To: %s\r\n"+
		"Subject: %s\r\n"+
		"MIME-Version: 1.0\r\n"+
		"Content-Type: text/html; charset=UTF-8\r\n"+
		"\r\n"+
		"%s\r\n", to[0], subject, body))

	var err error
	for i := 0; i < 3; i++ {
		err = smtp.SendMail(addr, auth, m.Username, to, msg)
		if err == nil {
			log.Printf("Email sent successfully to %v", to)
			return nil
		}
		log.Printf("Failed to send email (attempt %d/3): %v", i+1, err)
		time.Sleep(2 * time.Second) // Wait before retry
	}

	return fmt.Errorf("failed to send email after 3 attempts: %w", err)
}
