import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Portfólio do Jose Wernerson - Desenvolvedor Full Stack",
	description:
		"Este é o portfólio do Jose Wernerson. Sou um desenvolvedor full stack e um desenvolvedor autodidata. Adoro aprender coisas novas e estou sempre aberto a colaborar com outros. Sou apaixonado pelo poder transformador da tecnologia e estou sempre procurando por novos desafios.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="pt-BR">
			<body className={inter.className}>
				<ToastContainer />
				<main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
					<Navbar />
					{children}
					<ScrollToTop />
				</main>
				<Footer />
			</body>
			<GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
		</html>
	);
}
