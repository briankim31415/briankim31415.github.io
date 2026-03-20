import './App.css';
import Education from './sections/Education/Education';
import Experience from './sections/Experience/Experience';
import Footer from './sections/Footer/Footer';
import Hero from './sections/Hero/Hero';
import Projects from './sections/Projects/Projects';
import Skills from './sections/Skills/Skills';

function App() {
	return (
		<>
			<Hero />
			<Experience />
			<Projects />
			<Skills />
			<Education />
			<Footer />
		</>
	);
}

export default App;
