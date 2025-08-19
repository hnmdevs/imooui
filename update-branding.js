const fs = require('fs');
const path = require('path');

// List of files to update based on grep results
const filesToUpdate = [
  'CONTRIBUTING.md',
  'src/content/docs/components/blocks/stacking-cards.mdx',
  'src/content/docs/components/blocks/simple-marquee.mdx',
  'src/content/docs/components/image/parallax-floating.mdx',
  'src/content/docs/components/image/image-trail.mdx',
  'src/content/docs/components/text/scramble-in.mdx',
  'src/content/docs/components/filter/gooey-svg-filter.mdx',
  'src/content/docs/components/filter/pixelate-svg-filter.mdx',
  'src/content/docs/components/text/letter-3d-swap.mdx',
  'src/content/docs/components/text/text-along-path.mdx',
  'src/content/docs/components/physics/gravity.mdx',
  'src/content/docs/components/text/letter-swap.mdx',
  'src/content/docs/components/carousel/box-carousel.mdx',
  'src/content/docs/components/physics/cursor-attractor-and-gravity.mdx',
  'src/content/docs/components/text/scroll-and-swap.mdx',
  'src/content/docs/components/physics/elastic-line.mdx',
  'src/content/docs/components/text/random-letter-swap.mdx',
  'src/content/docs/components/text/variable-font-hover-by-letter.mdx',
  'src/content/docs/components/text/text-cursor-proximity.mdx',
  'src/content/docs/components/text/text-rotate.mdx',
  'src/content/docs/components/text/variable-font-hover-by-random-letter.mdx',
  'src/content/docs/components/text/breathing-text.mdx',
  'src/content/docs/components/text/text-highlighter.mdx',
  'src/content/docs/components/text/vertical-cut-reveal.mdx',
  'src/content/docs/components/text/scramble-hover.mdx',
  'src/content/docs/components/text/typewriter.mdx',
  'src/content/docs/components/text/variable-font-and-cursor.mdx',
  'src/content/docs/components/text/variable-font-cursor-proximity.mdx',
  'src/content/docs/components/text/underline-animation.mdx',
  'src/content/docs/components/text/underline-to-background.mdx',
  'src/content/docs/components/text/basic-number-ticker.mdx',
  'src/content/docs/components/blocks/circling-elements.mdx',
  'src/content/docs/components/blocks/marquee-along-svg-path.mdx',
  'src/content/docs/components/blocks/media-between-text.mdx',
  'src/content/docs/components/blocks/screensaver.mdx',
  'src/content/docs/components/blocks/drag-elements.mdx',
  'src/content/docs/components/blocks/float.mdx',
  'src/content/docs/components/background/pixel-trail.mdx',
  'src/content/docs/components/background/animated-gradient-svg.mdx'
];

function updateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Update shadcn commands to imooui commands
    const oldPattern = /shadcn@latest add &quot;https:\/\/imooui\.imoogleai\.xyz\/r\/([^"]+)\.json&quot;/g;
    const newPattern = 'imooui@latest add $1';
    
    if (content.match(oldPattern)) {
      content = content.replace(oldPattern, newPattern);
      updated = true;
      console.log(`Updated CLI commands in ${filePath}`);
    }
    
    // Remove GitHub references
    const githubPattern = /\[([^\]]+)\]\(https:\/\/github\.com[^)]+\)/g;
    if (content.match(githubPattern)) {
      content = content.replace(githubPattern, '$1');
      updated = true;
      console.log(`Removed GitHub links in ${filePath}`);
    }
    
    // Remove Twitter/X references
    const twitterPattern = /\[([^\]]+)\]\(https:\/\/(x|twitter)\.com[^)]+\)/g;
    if (content.match(twitterPattern)) {
      content = content.replace(twitterPattern, '$1');
      updated = true;
      console.log(`Removed Twitter/X links in ${filePath}`);
    }
    
    // Add ImooUI branding at the end if it's a component file
    if (filePath.includes('/components/') && !content.includes('Developed by Imoogle Tech')) {
      content = content.replace(/(\n*)$/, '\n\n---\n\n**ImooUI** - Developed by Imoogle Tech\n');
      updated = true;
      console.log(`Added ImooUI branding to ${filePath}`);
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Updated ${filePath}`);
    } else {
      console.log(`ℹ️  No changes needed in ${filePath}`);
    }
    
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

console.log('Starting branding update...\n');

filesToUpdate.forEach(updateFile);

console.log('\n🎉 Branding update completed!');