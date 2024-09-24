import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('personal_ad')).render(
	<React.StrictMode>
		<body>
			<h2>Brian Kim</h2>
			Department of Electrical and Computer Engineering <br />
			briankim31415@gmail.com
			<p>
				I am a second year master's student advised by Dr. Suzanne
				Barber. My research area is custom user metrics for online
				privacy policies. I also have background in data science and ML.
				I have a hidden talent in drinking more coffee than I should be
				drinking.
			</p>
			<p>Three potential topics I'd be interested in working are:</p>
			<ul>
				<li>Reinforcement Learning</li>
				<li>LLMs</li>
				<li>Computer Vision</li>
			</ul>
			<p>I have teamed up with Benson Ngai.</p>
		</body>
	</React.StrictMode>
);
