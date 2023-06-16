const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = ' ';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// type method
TypeWriter.prototype.type = function() {
    // current index of word;
    const current = this.wordIndex % this.words.length;
    // get full text
    const fullText = this.words[current];
    // check if in deleting state or not
    if(this.isDeleting) {
        // Remove characters
        this.txt = fullText.substr(0, this.txt.length - 1);
    } else {
        // Add charchters
        this.txt = fullText.substr(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

    // type speed
    let typeSpeed = 300;
    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    if(!this.isDeleting && this.txt === fullText) {
        // Set pause at end
        typeSpeed = this.wait;
        this.isDeleting = true;

    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // move to next word
        this.wordIndex++;
        // console.log(this.wordIndex);
        // pause befor typing
        typeSpeed = 500;
    }
    
    // console.log(this.txt);
    setTimeout(() => this.type(), typeSpeed);
}


//Init app
const init = () => {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'))
    const wait = txtElement.getAttribute('data-wait');
    // Init Typewriter;
    new TypeWriter(txtElement, words, wait);
}

//On loaded
document.addEventListener('DOMContentLoaded',init);