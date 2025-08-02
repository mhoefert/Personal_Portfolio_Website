const fs = require('fs');
const path = require('path');

const pages = [
  {
    id: 'vision-strategy',
    title: 'Vision, Strategy & Specifications',
    description: 'Defining clear product vision, strategy, and detailed specifications to guide development.'
  },
  {
    id: 'roadmapping',
    title: 'Roadmapping',
    description: 'Creating and maintaining a strategic product roadmap that aligns with business goals.'
  },
  {
    id: 'delivery',
    title: 'Delivery',
    description: 'Leading cross-functional teams to deliver high-quality products on time and within scope.'
  },
  {
    id: 'launch-measure-iterate',
    title: 'Launch, Measure & Iterate',
    description: 'Successfully launching products, measuring impact, and iterating based on data and feedback.'
  }
];

const template = `import ProcessTemplate, { ImageContainer, Card, fadeIn } from '../src/components/ProcessTemplate';
import { motion } from 'framer-motion';

const {title} = () => {
  return (
    <ProcessTemplate 
      title="{title}"
      description="{description}"
    >
      <p>
        [Your content here]
      </p>

      <h2>My Approach</h2>
      
      <p>
        [Describe your approach to this phase]
      </p>
      
      <h2>Case Study: [Project Name]</h2>
      
      <p>
        [Describe a relevant case study]
      </p>
      
      <h2>Outcomes & Impact</h2>
      
      <p>
        [Describe the outcomes and impact of your work]
      </p>
      
      <h2>Tools & Methods</h2>
      
      <p>[List tools and methods used]</p>
      
      <h2>Next Steps</h2>
      
      <p>
        [Describe what comes next after this phase]
      </p>
    </ProcessTemplate>
  );
};

export default {title};`;

// Create pages directory if it doesn't exist
const pagesDir = path.join(__dirname, '../src/pages');
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

// Generate page files
pages.forEach(page => {
  const filename = `${page.id}.js`;
  const filepath = path.join(pagesDir, filename);
  
  // Skip if file already exists
  if (fs.existsSync(filepath)) {
    console.log(`Skipping ${filename} - file already exists`);
    return;
  }
  
  // Replace placeholders and write file
  const content = template
    .replace(/{title}/g, page.title)
    .replace(/{description}/g, page.description);
  
  fs.writeFileSync(filepath, content);
  console.log(`Created ${filename}`);
});

console.log('Page generation complete!');
