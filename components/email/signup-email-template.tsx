export function SignupEmailTemplate(firstName: string) {
	return (
		<div
			style={{
				marginTop: "1rem",
				marginBottom: "1rem",
				fontFamily: "'Arial', sans-serif",
				color: "#000",
				padding: "1rem",
			}}>
			<h1
				style={{
					fontWeight: "bold",
					fontSize: "1.2rem",
					color: "#000",
					borderBottom: "1px solid #ddd",
					paddingBottom: "0.5rem",
				}}>
				Thanks for signing up!
			</h1>
			<p>Hi {firstName},</p>
			<p>Thanks for signing up for our app! We are glad to have you on-board.</p>
			<p>
				Our platform offers a seamless experience for ordering Electronic and Semiconductor Components, Printed
				Circuit Board (PCB) fabrication and assembly services, all at one place, without having to visit
				multiple websites.
			</p>
			<p>Head over to our website and shopping!</p>
			<p>
				In case you have any questions, feel free to contact us using any of the channels on our{" "}
				<a
					href="https://www.circuitparts.in/contact-us"
					style={{
						color: "#007BFF",
						textDecoration: "none",
					}}>
					contact page.
				</a>{" "}
				or you can also reply to this email and one of our team members will get back to you.
			</p>
			<p>Best,</p>
			<p>Circuit Parts Team</p>
			<p
				style={{
					borderTop: "1px solid #ddd",
					paddingTop: "0.5rem",
					fontSize: "0.8rem",
					color: "#777",
				}}>
				&copy; {new Date().getFullYear()} Circuit Parts. All rights reserved.
			</p>
		</div>
	);
}
