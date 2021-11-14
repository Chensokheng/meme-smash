import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function index() {
	const [memes, setMemes] = useState([]);
	const [selected, setSelected] = useState();

	useEffect(() => {
		getMeme(2).then((data) => {
			setMemes(data.memes);
		});

		document.addEventListener("keydown", function (event) {
			console.log(event);
			if (event.key === "ArrowRight") {
				updateMeme(1);
			} else if (event.key === "ArrowLeft") {
				updateMeme(0);
			}
		});
	}, []);

	const getMeme = (numberOfMeme) => {
		const url = `https://meme-api.herokuapp.com/gimme/${numberOfMeme}`;
		return fetch(url)
			.then((response) => response.json())
			.then((data) => data);
	};
	const updateMeme = (index) => {
		getMeme(1).then((data) => {
			setMemes((memes) =>
				index === 0
					? [memes[index], data.memes[0]]
					: [data.memes[0], memes[index]]
			);
			setSelected(index);
		});
	};

	return (
		<div className="bg-black min-h-screen flex flex-col w-full justify-center items-center ">
			<h1 className="text-5xl font-bold text-white">Left or right</h1>
			<div className="w-full flex justify-center items-center gap-5 mt-20 flex-col sm:flex-row">
				{memes.map((meme, index) => {
					return (
						<div
							className="sm:w-4/12 w-full"
							key={index}
							onClick={() => {
								updateMeme(index);
							}}
						>
							<h1 className="text-white">Author: {meme.author}</h1>
							<div
								className={`w-full h-45vh sm:h-100 bg-black cursor-pointer border-2 relative ${
									selected === index ? "border-8 border-green-500" : ""
								}`}
							>
								<Image
									src={meme.preview[2] ?? meme.preview[1] ?? "/404.png"}
									layout="fill"
									objectFit="contain"
									priority
								/>
							</div>
							<a href={meme.postLink} className="text-blue-500">
								PostLint: {meme.postLink}
							</a>
						</div>
					);
				})}
			</div>
		</div>
	);
}
