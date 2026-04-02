import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const contactForm = document.getElementById('contact-form') as HTMLFormElement;
const submitBtn = document.getElementById('contact-submit') as HTMLButtonElement;
const submitText = document.getElementById('submit-text');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = (document.getElementById('contact-name') as HTMLInputElement).value;
        const email = (document.getElementById('contact-email') as HTMLInputElement).value;
        const message = (document.getElementById('contact-message') as HTMLTextAreaElement).value;
        
        if (!name || !email || !message) return;
        
        try {
            if (submitBtn) submitBtn.disabled = true;
            if (submitText) submitText.innerText = 'Enviando...';
            
            await addDoc(collection(db, 'contacts'), {
                name,
                email,
                message,
                createdAt: serverTimestamp()
            });
            
            if (submitText) submitText.innerText = 'Mensagem Enviada!';
            contactForm.reset();
            
            setTimeout(() => {
                if (submitBtn) submitBtn.disabled = false;
                if (submitText) submitText.innerText = 'Enviar Mensagem';
            }, 3000);
            
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            if (submitText) submitText.innerText = 'Erro ao enviar';
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}
