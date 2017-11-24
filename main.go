package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/serverTest", serverTest)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func serverTest(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello world!!!!")
}
