"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
	const [error, setError] = useState({ email: false, required: false });
	const [isLoading, setIsLoading] = useState(false);
	const [userInput, setUserInput] = useState({
		name: "",
		email: "",
		message: "",
	});

	const checkRequired = () => {
		if (userInput.email && userInput.message && userInput.name) {
			setError({ ...error, required: false });
		}
	};

	const handleSendMail = async (e) => {
		e.preventDefault();

		if (!userInput.email || !userInput.message || !userInput.name) {
			setError({ ...error, required: true });
			return;
		} else if (error.email) {
			return;
		} else {
			setError({ ...error, required: false });
		}

		try {
			setIsLoading(true);
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_APP_URL}/api/contact`,
				userInput,
			);

			toast.success("Mensagem enviada com sucesso!");
			setUserInput({
				name: "",
				email: "",
				message: "",
			});
		} catch (error) {
			toast.error(error?.response?.data?.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
				Contato
			</p>
			<div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5">
				<p className="text-sm text-[#d3d8e8]">
					{
						"Se você tiver alguma dúvida ou preocupação, não hesite em entrar em contato comigo. Estou aberto a qualquer oportunidade de trabalho que se alinhe com minhas habilidades e interesses."
					}
				</p>
				<div className="mt-6 flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
						<label className="text-base">Seu nome: </label>
						<input
							className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
							type="text"
							maxLength="100"
							required={true}
							onChange={(e) =>
								setUserInput({ ...userInput, name: e.target.value })
							}
							onBlur={checkRequired}
							value={userInput.name}
						/>
					</div>

					<div className="flex flex-col gap-2">
						{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
						<label className="text-base">Seu e-mail: </label>
						<input
							className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
							type="email"
							maxLength="100"
							required={true}
							value={userInput.email}
							onChange={(e) =>
								setUserInput({ ...userInput, email: e.target.value })
							}
							onBlur={() => {
								checkRequired();
								setError({ ...error, email: !isValidEmail(userInput.email) });
							}}
						/>
						{error.email && (
							<p className="text-sm text-red-400">
								Por favor, forneça um e-mail válido!
							</p>
						)}
					</div>

					<div className="flex flex-col gap-2">
						{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
						<label className="text-base">Sua mensagem: </label>
						<textarea
							className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
							maxLength="500"
							name="message"
							required={true}
							onChange={(e) =>
								setUserInput({ ...userInput, message: e.target.value })
							}
							onBlur={checkRequired}
							rows="4"
							value={userInput.message}
						/>
					</div>
					<div className="flex flex-col items-center gap-3">
						{error.required && (
							<p className="text-sm text-red-400">
								Todos os campos são obrigatórios!
							</p>
						)}
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
							// biome-ignore lint/a11y/noRedundantRoles: <explanation>
							role="button"
							onClick={handleSendMail}
							disabled={isLoading}
						>
							{isLoading ? (
								<span>Enviando mensagem...</span>
							) : (
								<span className="flex items-center gap-1">
									Enviar mensagem
									<TbMailForward size={20} />
								</span>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ContactForm;
