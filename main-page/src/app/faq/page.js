// faq.js

import React from 'react';
import './styles.css';

function Faq() {
  return (
    <section className="bg-background dark:bg-primary p-8">
      <div className="max-w-screen-xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-8 text-black text-center">Frequently Asked Questions</h2>
        <hr className="mb-8 border-b border-gray-300" />
        <div className="grid-container">
          {/* First row */}
          <div className="faq-card">
            <h3 className="text-lg font-medium mb-2">What is a carbon footprint?</h3>
            <p className="text-gray-600">A carbon footprint is the total amount of greenhouse gases, primarily carbon dioxide, released into the atmosphere as a result of human activities such as transportation, energy consumption, and industrial processes. It's a measure of the impact our actions have on the environment in terms of climate change.</p>
          </div>
          <div className="faq-card">
            <h3 className="text-lg font-medium mb-2">Why should I track my carbon footprint?</h3>
            <p className="text-gray-600">Tracking your carbon footprint allows you to understand the environmental impact of your daily activities. By monitoring your emissions, you can identify areas where you can make changes to reduce your carbon footprint and contribute to a healthier planet.</p>
          </div>
          {/* Second row */}
          <div className="faq-card">
            <h3 className="text-lg font-medium mb-2">How does GreenMeter calculate my carbon footprint?</h3>
            <p className="text-gray-600">GreenMeter calculates your carbon footprint based on various factors such as travel distance, vehicle type, energy consumption, and lifestyle choices. By inputting data related to these activities, our platform uses established emission factors to estimate your carbon emissions.</p>
          </div>
          <div className="faq-card">
            <h3 className="text-lg font-medium mb-2">What can I do to reduce my carbon footprint?</h3>
            <p className="text-gray-600">There are many actions you can take to reduce your carbon footprint, including using public transportation, driving fuel-efficient vehicles, conserving energy at home, recycling, reducing meat consumption, and supporting sustainable products and practices.</p>
          </div>
          {/* Third row */}
          <div className="faq-card">
            <h3 className="text-lg font-medium mb-2">How often should I check my carbon emissions on GreenMeter?</h3>
            <p className="text-gray-600">It's a good idea to check your carbon emissions regularly, especially if you're actively trying to reduce your footprint. Monitoring your emissions on a monthly basis can help you track your progress over time and identify areas for improvement.</p>
          </div>
          <div className="faq-card">
            <h3 className="text-lg font-medium mb-2">Is GreenMeter available on mobile devices?</h3>
            <p className="text-gray-600">Yes, GreenMeter is accessible on both desktop and mobile devices. You can conveniently track your carbon footprint and access helpful resources on the go through our mobile-friendly website.</p>
          </div>
          {/* Fourth row */}
          <div className="faq-card">
            <h3 className="text-lg font-medium mb-2">Is my data safe and secure with GreenMeter?</h3>
            <p className="text-gray-600">Yes, we take data privacy and security seriously. Your personal information and carbon footprint data are encrypted and stored securely on our servers. We do not share your data with third parties without your consent.</p>
          </div>
          <div className="faq-card">
            <h3 className="text-lg font-medium mb-2">How can I provide feedback or report issues with GreenMeter?</h3>
            <p className="text-gray-600">We welcome your feedback and suggestions for improving GreenMeter. You can provide feedback through our website's feedback section or contact our support team directly via email. Additionally, if you encounter any technical issues or have concerns about your data, please don't hesitate to reach out to us.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;
