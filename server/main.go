package main

import (
	"fmt"
)

func main() {
	// http.HandleFunc("/serverTest", serverTest)
	// err := http.ListenAndServe(":8080", nil)
	// if err != nil {
	// 	log.Fatal("ListenAndServe: ", err)
	// }
	add, mul := sumAndProduct(2, 3)
	fmt.Println(add)
	fmt.Println(mul)
}

func sumAndProduct(a, b int) (add int, mul int) {
	add = a + b
	mul = a * b
	return
}

// func serverTest(w http.ResponseWriter, r *http.Request) {
// 	fmt.Fprintf(w, "Hello world!!!!")
// 	fmt.Println("r = ", r)
// }
