package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func determineListenAddress() (string, error) {
	port := os.Getenv("PORT")
	if port == "" {
		return "", fmt.Errorf("$PORT not set")
	}
	return ":" + port, nil
}

func main() {
	//port := os.Getenv("PORT")

	r := gin.Default()

	//r.Static("./build/static/css", "./assets")

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.Static("/RideHub/static", "./build/static")

	r.Use(static.Serve("/", static.LocalFile("./build/", true)))
	addr, err := determineListenAddress()
	if err != nil {
		log.Fatal(err)
	}
	r.Run(addr) // listen and serve on 0.0.0.0:8080
}
