"use client";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import React from "react";
import Button from "../Button/Button";
import useIsMobile from "@/hooks/useIsMobile";

const events = [
	{title: "tastingClassHeader", body: "tastingClass-body", engagement: "tastingClass-engagement", buttonTitle: "tastingClass-button", image: "tasting-info-card-1.png"},
	{title: "sommelierTableHeader", body: "sommelierTable-body", engagement: "sommelierTable-engagement", buttonTitle: "sommelierTable-button", image: "tasting-info-card-2.png"},
	{title: "privateTableHeaderCard", body: "privateTable-body", engagement: "privateTable-engagement", buttonTitle: "privateTable-button", image: "tasting-info-card-3.png"}
]

export default function CardsSection() {
	const { translations } = useLanguage();
	const isMobile = useIsMobile()
	
	return (
		<section className="flex w-full items-center justify-center pb-20">
 			<div className=" max-w-7xl">
				<h1 className={`my-6 text-center sm:my-9  ${isMobile ? "text-headlineSmall" : "text-displaySmall"}`}>{translations["tasting-info.cardsHeader"]}</h1>
				{isMobile && (
						<Image
							src={"/icons/chevron-down.svg"}
							height={20}
							width={20}
							className="mx-auto mb-6"
							alt="events arrow"
						/>
				)}
				<div className={`flex  justify-center gap-7 ${ isMobile ? "flex-col items-center" : "sm:flex-row sm:items-stretch"}`}>
					{events.map(event => (
						<div key={event.title} className={`flex w-72 flex-col gap-5 bg-white pb-5 sm:w-96 ${isMobile ? "rounded-[32px]" : "rounded-[50px]"}`}>
							<Image
								src={"/images/" + event.image}
								width={380}
								height={160}
								className="h-40 w-96"
								alt={event.title}
							/>

							<h3 className={`text-center ${isMobile ? "text-headlineSmall" : "text-headlineLarge"}`}>{translations["tasting-info." + event.title]}</h3>
							<div className={`flex flex-col justify-between px-3 ${isMobile ? "h-32" : "h-44"}`}>
								<p className={`text-center ${isMobile && "text-labelSmall"}`} dangerouslySetInnerHTML={{ __html: translations["tasting-info-card." + event.body]}}></p>
								<p className={`text-center ${isMobile && "text-labelSmall"}`}>{translations["tasting-info-card." + event.engagement]}</p>
							</div>

							<Button
								text={translations["tasting-info-card." + event.buttonTitle]}
								onClick={() => console.warn(event.title, " button clicked")}
								extraStyle="mx-auto min-w-max px-3"
								size={isMobile ? "sm" : "md"} 
							/>
						</div>
					))}
				</div>

			</div>
		</section>
	);
}

