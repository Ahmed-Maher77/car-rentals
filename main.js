const desktopNav = document.querySelector(".desktop-nav");
const triggerNavBtn = document.querySelector(".mobile-nav > span");

triggerNavBtn.addEventListener("click", () => {
	desktopNav.classList.toggle("active");
});

document.addEventListener("click", (e) => {
	console.log("Clicked element:", e.target);
	console.log("Is inside desktopNav?", desktopNav.contains(e.target));
	console.log("Is active?", desktopNav.classList.contains("active"));

	if (
		!desktopNav.contains(e.target) &&
		desktopNav.classList.contains("active") &&
		e.target !== triggerNavBtn
	) {
		console.log("Closing nav...");
		desktopNav.classList.remove("active");
	}
});

// Form validation and submission
const rentalForm = document.getElementById("rental-form");

// Add form validation
rentalForm.addEventListener("submit", function (e) {
	e.preventDefault();

	// Get form elements
	const carSelect = this.querySelector('select[name="car"]');
	const pickupSelect = this.querySelector('select[name="pickup"]');
	const pickupDateTime = this.querySelector('input[name="pickup_datetime"]');
	const dropoffSelect = this.querySelector('select[name="dropoff"]');
	const dropoffDateTime = this.querySelector(
		'input[name="dropoff_datetime"]'
	);
	const nameInput = this.querySelector('input[name="name"]');
	const emailInput = this.querySelector('input[name="email"]');
	const phoneInput = this.querySelector('input[name="phone"]');

	// Validation flags
	let isValid = true;
	const errors = [];

	// Clear previous error styles
	clearErrors();

	// Validate car selection
	if (!carSelect.value || carSelect.value === "0") {
		showError(carSelect, "Please select a car");
		isValid = false;
	}

	// Validate pickup location
	if (!pickupSelect.value || pickupSelect.value === "0") {
		showError(pickupSelect, "Please select pickup location");
		isValid = false;
	}

	// Validate pickup date/time
	if (!pickupDateTime.value.trim()) {
		showError(pickupDateTime, "Please enter pickup date and time");
		isValid = false;
	}

	// Validate dropoff location
	if (!dropoffSelect.value || dropoffSelect.value === "0") {
		showError(dropoffSelect, "Please select dropoff location");
		isValid = false;
	}

	// Validate dropoff date/time
	if (!dropoffDateTime.value.trim()) {
		showError(dropoffDateTime, "Please enter dropoff date and time");
		isValid = false;
	}

	// Validate name
	if (!nameInput.value.trim()) {
		showError(nameInput, "Please enter your name");
		isValid = false;
	} else if (nameInput.value.trim().length < 2) {
		showError(nameInput, "Name must be at least 2 characters long");
		isValid = false;
	}

	// Validate email
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailInput.value.trim()) {
		showError(emailInput, "Please enter your email address");
		isValid = false;
	} else if (!emailRegex.test(emailInput.value.trim())) {
		showError(emailInput, "Please enter a valid email address");
		isValid = false;
	}

	// Validate phone
	const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
	if (!phoneInput.value.trim()) {
		showError(phoneInput, "Please enter your phone number");
		isValid = false;
	} else if (
		!phoneRegex.test(phoneInput.value.trim().replace(/[\s\-\(\)]/g, ""))
	) {
		showError(phoneInput, "Please enter a valid phone number");
		isValid = false;
	}

	// Validate date logic
	if (pickupDateTime.value && dropoffDateTime.value) {
		const pickupDate = new Date(pickupDateTime.value);
		const dropoffDate = new Date(dropoffDateTime.value);
		const currentDate = new Date();

		if (pickupDate < currentDate) {
			showError(pickupDateTime, "Pickup date cannot be in the past");
			isValid = false;
		}

		if (dropoffDate <= pickupDate) {
			showError(
				dropoffDateTime,
				"Dropoff date must be after pickup date"
			);
			isValid = false;
		}
	}

	// If form is valid, show success popup
	if (isValid) {
		showSuccessPopup();
		this.reset();
	}
});

// Function to show error styling and message
function showError(element, message) {
	element.style.borderColor = "#ff4444";
	element.style.boxShadow = "0 0 5px rgba(255, 68, 68, 0.3)";

	// Create error message element
	const errorDiv = document.createElement("div");
	errorDiv.className = "error-message";
	errorDiv.style.color = "#ff4444";
	errorDiv.style.fontSize = "12px";
	errorDiv.style.marginTop = "5px";
	errorDiv.textContent = message;

	// Insert error message after the element
	element.parentNode.insertBefore(errorDiv, element.nextSibling);
}

// Function to clear all error styling
function clearErrors() {
	const formElements = rentalForm.querySelectorAll("input, select");
	formElements.forEach((element) => {
		element.style.borderColor = "";
		element.style.boxShadow = "";
	});

	// Remove all error messages
	const errorMessages = rentalForm.querySelectorAll(".error-message");
	errorMessages.forEach((error) => error.remove());
}

// Function to show success popup
function showSuccessPopup() {
	// Create popup overlay
	const overlay = document.createElement("div");
	overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-in-out;
    `;

	// Create popup content
	const popup = document.createElement("div");
	popup.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
        margin: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease-out;
    `;

	// Add success icon
	const icon = document.createElement("div");
	icon.innerHTML = "✓";
	icon.style.cssText = `
        width: 60px;
        height: 60px;
        background: #4CAF50;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        color: white;
        font-size: 30px;
        font-weight: bold;
    `;

	// Add success message
	const title = document.createElement("h3");
	title.textContent = "Booking Successful!";
	title.style.cssText = `
        color: #333;
        margin: 0 0 15px 0;
        font-size: 24px;
    `;

	const message = document.createElement("p");
	message.textContent =
		"Your car rental has been successfully booked. We will contact you shortly to confirm your reservation.";
	message.style.cssText = `
        color: #666;
        margin: 0 0 25px 0;
        line-height: 1.5;
    `;

	// Add close button
	const closeBtn = document.createElement("button");
	closeBtn.textContent = "OK";
	closeBtn.style.cssText = `
        background: #ffc107;
        color: #333;
        border: none;
        padding: 12px 30px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        transition: background 0.3s;
    `;

	closeBtn.addEventListener("mouseenter", () => {
		closeBtn.style.background = "#ffb300";
	});

	closeBtn.addEventListener("mouseleave", () => {
		closeBtn.style.background = "#ffc107";
	});

	closeBtn.addEventListener("click", () => {
		document.body.removeChild(overlay);
	});

	// Assemble popup
	popup.appendChild(icon);
	popup.appendChild(title);
	popup.appendChild(message);
	popup.appendChild(closeBtn);
	overlay.appendChild(popup);

	// Add to page
	document.body.appendChild(overlay);

	// Close on overlay click
	overlay.addEventListener("click", (e) => {
		if (e.target === overlay) {
			document.body.removeChild(overlay);
		}
	});

	// Close on Escape key
	document.addEventListener("keydown", function closeOnEscape(e) {
		if (e.key === "Escape") {
			document.body.removeChild(overlay);
			document.removeEventListener("keydown", closeOnEscape);
		}
	});
}

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from { 
            opacity: 0;
            transform: translateY(-50px);
        }
        to { 
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    #rental-form input:focus,
    #rental-form select:focus {
        outline: none;
        border-color: #ffc107;
        box-shadow: 0 0 5px rgba(255, 193, 7, 0.3);
    }
`;
document.head.appendChild(style);

// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
	// Hero Section Animation
	gsap.fromTo(
		"#sec-1 aside",
		{
			opacity: 0,
			x: -100,
			duration: 0,
		},
		{
			opacity: 1,
			x: 0,
			duration: 1,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#sec-1",
				start: "top 80%",
				end: "bottom 20%",
				toggleActions: "play none none reverse",
			},
		}
	);

	gsap.fromTo(
		"#sec-1 form",
		{
			opacity: 0,
			x: 100,
			duration: 0,
		},
		{
			opacity: 1,
			x: 0,
			duration: 1,
			ease: "power2.out",
			delay: 0.3,
			scrollTrigger: {
				trigger: "#sec-1",
				start: "top 80%",
				end: "bottom 20%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Services Section Animation
	gsap.fromTo(
		"#sec-2 header",
		{
			opacity: 0,
			y: 50,
			duration: 0,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#sec-2",
				start: "top 80%",
				end: "bottom 20%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Animate services articles with stagger
	gsap.fromTo(
		"#sec-2 article",
		{
			opacity: 0,
			y: 60,
			duration: 0,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			stagger: 0.2,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#sec-2",
				start: "top 70%",
				end: "bottom 20%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Network Section Animation
	gsap.fromTo(
		"#sec-3 img",
		{
			opacity: 0,
			scale: 0.8,
			duration: 0,
		},
		{
			opacity: 1,
			scale: 1,
			duration: 1,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#sec-3",
				start: "top 80%",
				end: "bottom 20%",
				toggleActions: "play none none reverse",
			},
		}
	);

	gsap.fromTo(
		"#sec-3 header",
		{
			opacity: 0,
			x: 100,
			duration: 0,
		},
		{
			opacity: 1,
			x: 0,
			duration: 1,
			ease: "power2.out",
			delay: 0.3,
			scrollTrigger: {
				trigger: "#sec-3",
				start: "top 80%",
				end: "bottom 20%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Car Selection Section Animation
	gsap.fromTo(
		"#sec-4 header",
		{
			opacity: 0,
			y: 50,
			duration: 0,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#sec-4",
				start: "top 80%",
				end: "bottom 20%",
				toggleActions: "play none none reverse",
			},
		}
	);

	gsap.fromTo(
		"#sec-4 .car-details",
		{
			opacity: 0,
			x: -100,
			duration: 0,
		},
		{
			opacity: 1,
			x: 0,
			duration: 1,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#sec-4",
				start: "top 80%",
				end: "bottom 20%",
				toggleActions: "play none none reverse",
			},
		}
	);

	gsap.fromTo(
		"#sec-4 .car-image",
		{
			opacity: 0,
			x: 100,
			duration: 0,
		},
		{
			opacity: 1,
			x: 0,
			duration: 1,
			ease: "power2.out",
			delay: 0.3,
			scrollTrigger: {
				trigger: "#sec-4",
				start: "top 80%",
				end: "bottom 20%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Support Section Animation
	gsap.fromTo(
		"#sec-5 .support-content",
		{
			opacity: 0,
			y: 50,
			duration: 0,
		},
		{
			opacity: 1,
			y: 0,
			duration: 1,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#sec-5",
				start: "top 80%",
				end: "bottom 20%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Blog Section Animation
	gsap.fromTo(
		"#sec-6 header",
		{
			opacity: 0,
			y: 50,
			duration: 0,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#sec-6",
				start: "top 80%",
				end: "bottom 20%",
				toggleActions: "play none none reverse",
			},
		}
	);

	gsap.fromTo(
		"#sec-6 .blog-card",
		{
			opacity: 0,
			y: 60,
			duration: 0,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			stagger: 0.2,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#sec-6",
				start: "top 70%",
				end: "bottom 20%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Footer Animation
	gsap.fromTo(
		"footer .footer-content",
		{
			opacity: 0,
			y: 50,
			duration: 0,
		},
		{
			opacity: 1,
			y: 0,
			duration: 1,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "footer",
				start: "top 90%",
				end: "bottom 10%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Animate footer sections with stagger
	gsap.fromTo(
		"footer .footer-section",
		{
			opacity: 0,
			y: 30,
			duration: 0,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.8,
			stagger: 0.1,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "footer",
				start: "top 80%",
				end: "bottom 20%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Social links animation - only when footer comes into view
	gsap.fromTo(
		".social-links a",
		{
			opacity: 0,
			scale: 0,
			rotation: 180,
			duration: 0,
		},
		{
			opacity: 1,
			scale: 1,
			rotation: 0,
			duration: 0.6,
			stagger: 0.1,
			ease: "back.out(1.7)",
			scrollTrigger: {
				trigger: "footer",
				start: "top 80%",
				end: "bottom 20%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Contact info animation
	gsap.fromTo(
		".contact-info p",
		{
			opacity: 0,
			x: -20,
			duration: 0,
		},
		{
			opacity: 1,
			x: 0,
			duration: 0.6,
			stagger: 0.1,
			ease: "power2.out",
			scrollTrigger: {
				trigger: ".contact-info",
				start: "top 90%",
				end: "bottom 10%",
				toggleActions: "play none none reverse",
			},
		}
	);

	// Header animation on page load
	gsap.fromTo(
		"header",
		{
			opacity: 0,
			y: -50,
			duration: 0,
		},
		{
			opacity: 1,
			y: 0,
			duration: 1,
			ease: "power2.out",
		}
	);

	// Logo animation
	gsap.fromTo(
		"header img",
		{
			opacity: 0,
			scale: 0.5,
			duration: 0,
		},
		{
			opacity: 1,
			scale: 1,
			duration: 0.8,
			ease: "back.out(1.7)",
			delay: 0.2,
		}
	);

	// Navigation animation
	gsap.fromTo(
		"header nav a",
		{
			opacity: 0,
			y: -20,
			duration: 0,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.6,
			stagger: 0.1,
			ease: "power2.out",
			delay: 0.4,
		}
	);

	// Form elements animation on page load
	gsap.fromTo(
		"#rental-form input, #rental-form select",
		{
			opacity: 0,
			y: 20,
			duration: 0,
		},
		{
			opacity: 1,
			y: 0,
			duration: 0.6,
			stagger: 0.05,
			ease: "power2.out",
			delay: 0.8,
		}
	);

	// Button animation
	gsap.fromTo(
		"#rental-form button",
		{
			opacity: 0,
			scale: 0.8,
			duration: 0,
		},
		{
			opacity: 1,
			scale: 1,
			duration: 0.6,
			ease: "back.out(1.7)",
			delay: 1.2,
		}
	);

	// Smooth scroll for navigation links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute("href"));
			if (target) {
				gsap.to(window, {
					duration: 1,
					scrollTo: {
						y: target,
						offsetY: 100,
						offsetX: 100,
					},
					ease: "power2.inOut",
				});
			}
		});
	});

	// Car Slider Functionality
	const carData = [
		{
			title: "Audi 3000 msi",
			price: "$149/day",
			description: "Experience luxury and performance with our premium Audi model. Perfect for business trips or special occasions.",
			capacity: "Capacity: 04 Person",
			doors: "Doors: 4",
			ac: "Air Condition: Dual Zone",
			transmission: "Transmission: Automatic",
			image: "images/car.jpg",
			alt: "Audi 3000 msi"
		},
		{
			title: "BMW X5 Luxury",
			price: "$199/day",
			description: "Premium SUV with advanced technology and spacious interior. Ideal for family trips and luxury travel.",
			capacity: "Capacity: 07 Person",
			doors: "Doors: 5",
			ac: "Air Condition: Triple Zone",
			transmission: "Transmission: Automatic",
			image: "images/b1.jpg",
			alt: "BMW X5 Luxury"
		},
		{
			title: "Mercedes C-Class",
			price: "$179/day",
			description: "Elegant sedan with superior comfort and cutting-edge features. Perfect for executive travel and daily commuting.",
			capacity: "Capacity: 05 Person",
			doors: "Doors: 4",
			ac: "Air Condition: Dual Zone",
			transmission: "Transmission: Automatic",
			image: "images/b2.jpg",
			alt: "Mercedes C-Class"
		}
	];

	let currentCarIndex = 0;

	function updateCarDisplay(index) {
		const car = carData[index];
		
		// Update car details with animation
		gsap.to("#car-title", {
			duration: 0.3,
			opacity: 0,
			y: -20,
			onComplete: () => {
				document.getElementById("car-title").textContent = car.title;
				gsap.to("#car-title", {
					duration: 0.3,
					opacity: 1,
					y: 0
				});
			}
		});

		gsap.to("#car-price", {
			duration: 0.3,
			opacity: 0,
			scale: 0.8,
			onComplete: () => {
				document.getElementById("car-price").textContent = car.price;
				gsap.to("#car-price", {
					duration: 0.3,
					opacity: 1,
					scale: 1
				});
			}
		});

		gsap.to("#car-description", {
			duration: 0.3,
			opacity: 0,
			y: 20,
			onComplete: () => {
				document.getElementById("car-description").textContent = car.description;
				gsap.to("#car-description", {
					duration: 0.3,
					opacity: 1,
					y: 0
				});
			}
		});

		// Update car features
		gsap.to("#car-capacity", {
			duration: 0.2,
			opacity: 0,
			onComplete: () => {
				document.getElementById("car-capacity").textContent = car.capacity;
				gsap.to("#car-capacity", { duration: 0.2, opacity: 1 });
			}
		});

		gsap.to("#car-doors", {
			duration: 0.2,
			opacity: 0,
			delay: 0.1,
			onComplete: () => {
				document.getElementById("car-doors").textContent = car.doors;
				gsap.to("#car-doors", { duration: 0.2, opacity: 1 });
			}
		});

		gsap.to("#car-ac", {
			duration: 0.2,
			opacity: 0,
			delay: 0.2,
			onComplete: () => {
				document.getElementById("car-ac").textContent = car.ac;
				gsap.to("#car-ac", { duration: 0.2, opacity: 1 });
			}
		});

		gsap.to("#car-transmission", {
			duration: 0.2,
			opacity: 0,
			delay: 0.3,
			onComplete: () => {
				document.getElementById("car-transmission").textContent = car.transmission;
				gsap.to("#car-transmission", { duration: 0.2, opacity: 1 });
			}
		});

		// Update car image with fade effect
		gsap.to("#car-image", {
			duration: 0.4,
			opacity: 0,
			scale: 0.9,
			onComplete: () => {
				document.getElementById("car-image").src = car.image;
				document.getElementById("car-image").alt = car.alt;
				gsap.to("#car-image", {
					duration: 0.4,
					opacity: 1,
					scale: 1
				});
			}
		});

		// Update dots
		document.querySelectorAll('.car-dots .dot').forEach((dot, i) => {
			dot.classList.toggle('active', i === index);
		});

		currentCarIndex = index;
	}

	// Add click event listeners to dots
	document.querySelectorAll('.car-dots .dot').forEach((dot, index) => {
		dot.addEventListener('click', () => {
			updateCarDisplay(index);
		});
	});

	// Auto-slide functionality (optional)
	let autoSlideInterval;
	function startAutoSlide() {
		autoSlideInterval = setInterval(() => {
			const nextIndex = (currentCarIndex + 1) % carData.length;
			updateCarDisplay(nextIndex);
		}, 5000); // Change car every 5 seconds
	}

	function stopAutoSlide() {
		if (autoSlideInterval) {
			clearInterval(autoSlideInterval);
		}
	}

	// Start auto-slide when section comes into view
	const carSection = document.querySelector('#sec-4');
	if (carSection) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					startAutoSlide();
				} else {
					stopAutoSlide();
				}
			});
		}, { threshold: 0.5 });

		observer.observe(carSection);
	}

	// Pause auto-slide when user hovers over car section
	carSection.addEventListener('mouseenter', stopAutoSlide);
	carSection.addEventListener('mouseleave', startAutoSlide);

	// Parallax effect removed to fix header visibility issues
	// gsap.to("#sec-1", {
	// 	yPercent: -30,
	// 	ease: "none",
	// 	scrollTrigger: {
	// 		trigger: "#sec-1",
	// 		start: "top bottom",
	// 		end: "bottom top",
	// 		scrub: true,
	// 	},
	// });
});
