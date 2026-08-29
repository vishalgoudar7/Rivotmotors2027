const fs = require('fs');
const path = require('path');

const excludeDirs = ['node_modules', '.next', 'asset/rivot-website-main'];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const relPath = path.relative('.', fullPath);
        
        // Check if relPath is in excludeDirs or matches an excluded pattern
        if (excludeDirs.some(ex => relPath === ex || relPath.startsWith(ex + path.sep))) {
            return;
        }
        
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else {
            results.push(fullPath);
        }
    });
    return results;
}

const files = walk('.');

files.forEach(file => {
    // Avoid search.js and search.py
    if (file === 'search.js' || file === 'search.py') return;
    
    let content;
    try {
        content = fs.readFileSync(file, 'utf8');
    } catch (e) {
        return; // skip binaries or inaccessible files
    }
    
    const lines = content.split('\n');
    lines.forEach((line, index) => {
        if (line.includes('Intelligence, always in view') || line.includes('CONNECTIVITY')) {
            console.log('FILE:', file);
            console.log('LINE:', index + 1);
            console.log('CONTENT:', line.trim());
            
            // Print nearby lines
            const start = Math.max(0, index - 2);
            const end = Math.min(lines.length - 1, index + 2);
            console.log('CONTEXT:');
            for (let i = start; i <= end; i++) {
                const marker = i === index ? '>>>' : '   ';
                console.log(`\t${marker} ${i + 1}: ${lines[i].trim()}`);
            }
            console.log('-'.repeat(50));
        }
    });
});
