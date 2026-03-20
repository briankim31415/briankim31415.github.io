import './App.css';
import Footer from './sections/Footer/Footer';
import Hero from './sections/Hero/Hero';
import Projects from './sections/Projects/Projects';
import SectionNav from './common/SectionNav';
import { sections } from './content/siteContent';
import useActiveSection from './hooks/useActiveSection';
import Skills from './sections/Skills/Skills';
import Timeline from './sections/Timeline/Timeline';

const sectionIds = sections.map((section) => section.id);

function App() {
	const activeSection = useActiveSection(sectionIds);

	return (
		<>
			<SectionNav
				sections={sections}
				activeSection={activeSection}
			/>
			<Hero />
			<Projects />
			<Timeline />
			<Skills />
			<Footer />
		</>
	);
}

export default App;
