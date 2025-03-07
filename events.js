
    document.querySelectorAll(".fade-target").forEach((element, index) => {
        setTimeout(() => {
            element.classList.add("fade-in");
        }, index * 200); 


    document.querySelectorAll(".get-ticket-btn").forEach(button => {
        button.addEventListener("click", async (event) => {
            const eventTitle = event.target.dataset.event;
            const phoneInput = document.createElement("input");
            phoneInput.type = "tel";
            phoneInput.placeholder = "Enter your M-Pesa number";
            // phoneInput.className = "fixed top-12 left-1/2 transform -translate-x-1/2 p-2 text-black border border-gray-300 rounded-md text-sm w-60 fade-in";
            // document.body.appendChild(phoneInput);

            phoneInput.addEventListener("keypress", async (e) => {
                if (e.key === "Enter") {
                    const phone = phoneInput.value;
                    if (!phone) return showNotification("Phone number is required!", false);
                    document.body.removeChild(phoneInput);

                    try {
                        const response = await fetch("http://localhost:5000/purchase-ticket", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ phone, amount: 1000, event: eventTitle })
                        });
                        const data = await response.json();
                        showNotification(data.message, data.success);
                    } catch (error) {
                        showNotification("Payment failed! Try again.", false);
                    }
                }
            });
        });
    });
});