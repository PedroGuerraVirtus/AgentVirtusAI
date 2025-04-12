// Handle form submission
if (leadCaptureForm) {
    leadCaptureForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(leadCaptureForm);
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        
        // Store lead data in localStorage for persistence
        localStorage.setItem('virtusLeadData', JSON.stringify(formDataObj));
        
        // Replace the form container with the Mailchimp form
        const formContainer = leadCaptureForm.parentElement;
        
        // Create Mailchimp form container
        const mailchimpFormContainer = document.createElement('div');
        mailchimpFormContainer.innerHTML = `
            <div id="mc_embed_shell">
                <div id="mc_embed_signup">
                    <form id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" novalidate>
                        <div id="mc_embed_signup_scroll">
                            <h2>Get access to the content</h2>
                            <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
                            <div class="mc-field-group">
                                <label for="mce-EMAIL">Melhor e-mail <span class="asterisk">*</span></label>
                                <input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required value="${formDataObj.email || ''}">
                            </div>
                            <div class="mc-field-group">
                                <label for="mce-FNAME">Nome <span class="asterisk">*</span></label>
                                <input type="text" name="FNAME" class="required text" id="mce-FNAME" required value="${formDataObj.name || ''}">
                            </div>
                            <div class="mc-field-group">
                                <label for="mce-PHONE">Telefone <span class="asterisk">*</span></label>
                                <input type="text" name="PHONE" class="REQ_CSS" id="mce-PHONE" value="${formDataObj.phone || ''}">
                            </div>
                            <div class="mc-field-group">
                                <label for="mce-MMERGE2">Empresa <span class="asterisk">*</span></label>
                                <input type="text" name="MMERGE2" class="required text" id="mce-MMERGE2" required value="${formDataObj.company || ''}">
                            </div>
                            <div hidden>
                                <input type="hidden" name="tags" value="10281509">
                            </div>
                            <div id="mce-responses" class="clear">
                                <div class="response" id="mce-error-response" style="display: none;"></div>
                                <div class="response" id="mce-success-response" style="display: none;"></div>
                            </div>
                            <div aria-hidden="true" style="position: absolute; left: -5000px;">
                                <input type="text" name="b_3c8ae72561699831838b98633_c125290494" tabindex="-1" value="">
                            </div>
                            <div class="clear">
                                <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button submit-button" value="Subscribe">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="success-message" style="display: none;">
                <h3>Thank You!</h3>
                <p>You now have full access to our comprehensive guide on transforming your lead response with AI chatbots.</p>
                <p>Start exploring the content below to discover how you can boost your conversion rates and grow your business.</p>
                <button class="submit-button" id="access-content-btn">Access Content Now</button>
            </div>
        `;
        
        // Replace the form with the Mailchimp form
        formContainer.innerHTML = '';
        formContainer.appendChild(mailchimpFormContainer);
        
        // Add custom styling to Mailchimp form
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            #mc_embed_signup {
                background: transparent;
                clear: left;
                font-family: 'Montserrat', sans-serif;
                width: 100%;
            }
            #mc_embed_signup .mc-field-group {
                margin-bottom: 1rem;
            }
            #mc_embed_signup input {
                width: 100%;
                padding: 0.75rem 1rem;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-family: 'Montserrat', sans-serif;
                font-size: 1rem;
                transition: border-color 0.3s ease;
            }
            #mc_embed_signup input:focus {
                outline: none;
                border-color: var(--primary-color);
            }
            #mc_embed_signup .button {
                width: 100%;
                background-color: var(--primary-color);
                color: var(--light-color);
                border: none;
                border-radius: 50px;
                padding: 0.75rem 1.5rem;
                font-family: 'Montserrat', sans-serif;
                font-size: 1rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 1px;
                height: auto;
                line-height: normal;
            }
            #mc_embed_signup .button:hover {
                background-color: var(--dark-color);
                transform: translateY(-3px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
            #mc_embed_signup div.response {
                margin: 1rem 0;
                padding: 1rem;
                font-weight: bold;
                border-radius: 5px;
            }
            #mc_embed_signup div#mce-success-response {
                background-color: rgba(0, 128, 0, 0.1);
                color: green;
            }
            #mc_embed_signup div#mce-error-response {
                background-color: rgba(255, 0, 0, 0.1);
                color: red;
            }
            #mc_embed_signup .indicates-required {
                text-align: right;
                font-size: 0.8rem;
                margin-bottom: 1rem;
            }
            #mc_embed_signup .asterisk {
                color: red;
            }
            #mc_embed_signup label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 600;
            }
        `;
        document.head.appendChild(styleElement);
        
        // Handle Mailchimp form submission
        const mailchimpForm = document.getElementById('mc-embedded-subscribe-form');
        if (mailchimpForm) {
            mailchimpForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Collect form data
                const mailchimpData = new FormData(mailchimpForm);
                const mailchimpObj = {};
                mailchimpData.forEach((value, key) => {
                    mailchimpObj[key] = value;
                });
                
                // Construct the payload for Mailchimp
                const payload = {
                    EMAIL: mailchimpObj['EMAIL'],
                    FNAME: mailchimpObj['FNAME'],
                    PHONE: mailchimpObj['PHONE'],
                    MMERGE2: mailchimpObj['MMERGE2'],
                    tags: mailchimpObj['tags'],
                    'b_3c8ae72561699831838b98633_c125290494': mailchimpObj['b_3c8ae72561699831838b98633_c125290494']
                };
                
                // Send AJAX request to Mailchimp
                fetch('https://virtusmidia.us11.list-manage.com/subscribe/post-json?u=3c8ae72561699831838b98633&id=c125290494&f_id=00a7cbe3f0&c=?', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams(payload).toString(),
                    mode: 'cors'
                })
                .then(response => response.text())
                .then(data => {
                    // Mailchimp responds with JSONP, so we need to clean it
                    const jsonData = data.match(/\{.*\}/);
                    if (jsonData) {
                        const result = JSON.parse(jsonData[0]);
                        const successResponseElement = document.getElementById('mce-success-response');
                        const errorResponseElement = document.getElementById('mce-error-response');
                        
                        if (result.result === 'success') {
                            // Show success message
                            successResponseElement.textContent = result.msg;
                            successResponseElement.style.display = 'block';
                            errorResponseElement.style.display = 'none';
                            
                            // Show custom success message
                            const mailchimpContainer = document.getElementById('mc_embed_signup');
                            const successMessage = document.querySelector('.success-message');
                            if (mailchimpContainer && successMessage) {
                                mailchimpContainer.style.display = 'none';
                                successMessage.style.display = 'block';
                                
                                // Add event listener to access content button
                                document.getElementById('access-content-btn').addEventListener('click', function() {
                                    hidePopup();
                                });
                            }
                        } else {
                            // Show error message
                            errorResponseElement.textContent = result.msg;
                            errorResponseElement.style.display = 'block';
                            successResponseElement.style.display = 'none';
                        }
                    } else {
                        throw new Error('Invalid response from Mailchimp');
                    }
                })
                .catch(error => {
                    console.error('Error submitting to Mailchimp:', error);
                    const errorResponseElement = document.getElementById('mce-error-response');
                    errorResponseElement.textContent = 'An error occurred. Please try again later.';
                    errorResponseElement.style.display = 'block';
                });
            });
        }
    });
}
