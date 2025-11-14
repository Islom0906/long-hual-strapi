'use strict';

const {sendEmail} = require("../../../../utils/email");
const axios = require("axios");
module.exports = {
    async afterCreate(event) {
        const {result} = event;
        try {
            // Massivlarni to'g'ri stringga o'girish
            const drivenStates = Array.isArray(result.driven_state)
                ? result.driven_state.map(item => item.label).join(', ')
                : '';

            const equipments = Array.isArray(result.equipments)
                ? result.equipments.map(eq => `${eq.equipments}: ${eq.duration}`).join('<br/>')
                : '';

            const companies = Array.isArray(result.company)
                ? result.company
                    .map(c => `
              <div style="margin-bottom:10px">
                <strong>Company name:</strong> ${c.company_name}<br/>
                <strong>Working duration:</strong> ${c.work_duration}<br/>
                <strong>Position:</strong> ${c.position}<br/>
                <strong>Operate semitruck:</strong> ${c.operate_semitruck}<br/>
                <strong>Company address:</strong> ${c.company_address}<br/>
                <strong>Company phone:</strong> ${c.company_phone}<br/>
                <strong>Company email:</strong> ${c.company_email}<br/>
                <strong>Contact person:</strong> ${c.contact_person}<br/>
                <strong>Reason leave:</strong> ${c.reason_leave}<br/>
              </div>
            `)
                    .join('')
                : '';

            await sendEmail({
                to: process.env.EMAIL_FOR_DRIVERS,
                subject: `New message from ${result.first_name || result.name || 'Applicant'}`,
                text: `New application received from ${result.first_name || 'Unknown'}`,
                html: `
          <h3>New Application Received</h3>
          <p><strong>Position type:</strong> ${result.position_type}</p>
          <p><strong>First name:</strong> ${result.first_name}</p>
          <p><strong>Middle name:</strong> ${result.middle_name}</p>
          <p><strong>SSN:</strong> ${result.ssn}</p>
          <p><strong>Date of Birth:</strong> ${result.birthday}</p>
          <p><strong>Address:</strong> ${result.current_address}</p>
          <p><strong>Additional address:</strong> ${result.additional_address}</p>
          <p><strong>State:</strong> ${result.state}</p>
          <p><strong>Zip Code:</strong> ${result.zip_code}</p>
          <p><strong>Primary phone:</strong> ${result.primary_phone}</p>
          <p><strong>Cell phone:</strong> ${result.cell_phone}</p>
          <p><strong>Email address:</strong> ${result.contact_email}</p>
          <p><strong>Preferred contact method:</strong> ${result.contact_method}</p>
          <p><strong>Job alerts consent:</strong> ${result.job_alerts_consent}</p>
          <p><strong>Recruiting alerts consent:</strong> ${result.recruiting_alerts_consent}</p>
          <p><strong>Willing to work as a team?:</strong> ${result.willing_team}</p>
          <p><strong>Driving experience:</strong> ${result.drive_experience}</p>
          <p><strong>CDL-A experience (past 3 years):</strong> ${result.cdla_drive_experience}</p>
          <p><strong>Preventable accident (past 5 years):</strong> ${result.support}</p>
          <p><strong>Authorized to work in U.S.:</strong> ${result.legally_us}</p>
          <p><strong>English proficiency:</strong> ${result.english_proficiency_public}</p>
          <p><strong>Illegal drug use (past 90 days):</strong> ${result.illegal_drug_use_last_90_days}</p>
          <hr/>
          <h4>Emergency Contact</h4>
          <p><strong>Name:</strong> ${result.nearest_first_name} ${result.nearest_last_name}</p>
          <p><strong>Phone:</strong> ${result.emergency_phone}</p>
          <p><strong>Address:</strong> ${result.emergency_address}</p>
          <p><strong>City:</strong> ${result.emergency_city}</p>
          <p><strong>State:</strong> ${result.emergency_state}</p>
          <p><strong>Zip Code:</strong> ${result.emergency_zip_code}</p>
          <p><strong>Relationship:</strong> ${result.relationship}</p>
          <hr/>
          <p><strong>States driven regularly:</strong> ${drivenStates}</p>
          <p><strong>Tractor & Semi-Trailer:</strong> ${result.tractor_and_semitrailer}</p>
          <p><strong>Equipments:</strong><br/>${equipments}</p>
          <hr/>
          <h4>Companies</h4>
          ${companies}
          <hr/>
          <p><strong>License number:</strong> ${result.license_number}</p>
          <p><strong>License state:</strong> ${result.license_state}</p>
          <p><strong>License expiration date:</strong> ${result.license_date}</p>
          <p><strong>DOT medical card expiration:</strong> ${result.medical_expiration_date}</p>
          <p><strong>Commercial driver license:</strong> ${result.commercial_driver_license}</p>
          <p><strong>License class:</strong> ${result.license_class}</p>
          <p><strong>Endorsements:</strong> ${result.endorsements}</p>
          <hr/>
          <p><strong>Signature:</strong> ${result.signature}</p>
          <p><strong>Date:</strong> ${result.today}</p>
        `,
            });
            const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
            const chatId = process.env.TELEGRAM_CHAT_ID;

            const text  = `
📩 *New Application Received*

*👤 Personal Information*
• *Position type:* ${result.position_type}
• *First name:* ${result.first_name}
• *Middle name:* ${result.middle_name}
• *SSN:* ${result.ssn}
• *Date of Birth:* ${result.birthday}
• *Address:* ${result.current_address}
• *Additional address:* ${result.additional_address}
• *State:* ${result.state}
• *Zip Code:* ${result.zip_code}
• *Primary phone:* ${result.primary_phone}
• *Cell phone:* ${result.cell_phone}
• *Email:* ${result.contact_email}
• *Preferred contact method:* ${result.contact_method}
• *Job alerts consent:* ${result.job_alerts_consent}
• *Recruiting alerts consent:* ${result.recruiting_alerts_consent}

*🚛 Driving Information*
• *Willing to work as a team:* ${result.willing_team}
• *Driving experience:* ${result.drive_experience}
• *CDL-A (3 years):* ${result.cdla_drive_experience}
• *Preventable accident (5 years):* ${result.support}
• *Authorized to work in U.S.:* ${result.legally_us}
• *English proficiency:* ${result.english_proficiency_public}
• *Illegal drug use (last 90 days):* ${result.illegal_drug_use_last_90_days}

*🗺️ States Driven Regularly:*  
${drivenStates}

*🚚 Tractor & Semi-Trailer:*  
${result.tractor_and_semitrailer}

*⚙️ Equipments:*  
${Array.isArray(result.equipments) ? result.equipments.map(eq => `• ${eq.equipments}: ${eq.duration}`).join('\n') : ''}

*🏢 Companies (Work History):*
${Array.isArray(result.company)
                ? result.company
                    .map(c => `
— *Company name:* ${c.company_name}
   *Working duration:* ${c.work_duration}
   *Position:* ${c.position}
   *Operate semitruck:* ${c.operate_semitruck}
   *Address:* ${c.company_address}
   *Phone:* ${c.company_phone}
   *Email:* ${c.company_email}
   *Contact person:* ${c.contact_person}
   *Reason leave:* ${c.reason_leave}
`)
                    .join('\n')
                : ''
            }

*📄 License Information*
• *License number:* ${result.license_number}
• *License state:* ${result.license_state}
• *Expiration date:* ${result.license_date}
• *DOT medical card expiration:* ${result.medical_expiration_date}
• *Commercial driver license:* ${result.commercial_driver_license}
• *License class:* ${result.license_class}
• *Endorsements:* ${result.endorsements}

*🆘 Emergency Contact*
• *Name:* ${result.nearest_first_name} ${result.nearest_last_name}
• *Phone:* ${result.emergency_phone}
• *Address:* ${result.emergency_address}
• *City:* ${result.emergency_city}
• *State:* ${result.emergency_state}
• *Zip:* ${result.emergency_zip_code}
• *Relationship:* ${result.relationship}

*✍️ Signature:* ${result.signature}  
*📅 Date:* ${result.today}
`;


            await axios.post(
                `https://api.telegram.org/bot${telegramToken}/sendMessage`,
                {
                    chat_id: chatId,
                    text,
                    parse_mode: "Markdown"
                }
            );

            strapi.log.info(`✅ Email yuborildi: ${result.first_name || 'Unknown'}`);
        } catch (err) {
            strapi.log.error('❌ Email yuborishda xato:', err);
        }
    },
};
