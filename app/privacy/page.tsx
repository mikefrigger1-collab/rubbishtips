// app/privacy/page.tsx
import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: "Privacy Policy | RubbishTips.com.au",
  description: "Privacy policy for RubbishTips.com.au. Learn how we collect, use, and protect your personal information in compliance with Australian privacy laws.",
};

export default function PrivacyPage() {
  const currentDate = new Date().toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {currentDate}</p>

          <div className="prose prose-lg max-w-none space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                RubbishTips.com.au ("we", "our", or "us") is committed to protecting your privacy and personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit 
                our website at www.rubbishtips.com.au (the "Website").
              </p>
              <p className="text-gray-700 leading-relaxed">
                We comply with the Australian Privacy Principles (APPs) contained in the Privacy Act 1988 (Commonwealth) 
                and are committed to ensuring that your personal information is handled in accordance with Australian privacy laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Information You Provide</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide when you:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Contact us through our contact forms or email</li>
                <li>Submit feedback or suggestions about our website</li>
                <li>Report errors or request updates to facility information</li>
                <li>Subscribe to our newsletter or updates (if applicable)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Information Collected Automatically</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you visit our website, we automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>IP address and general location information</li>
                <li>Browser type, version, and operating system</li>
                <li>Pages visited, time spent on pages, and referral sources</li>
                <li>Device information and screen resolution</li>
                <li>Date and time of your visit</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>To provide and maintain our website services</li>
                <li>To respond to your enquiries and provide customer support</li>
                <li>To improve our website functionality and user experience</li>
                <li>To update and maintain accurate facility information</li>
                <li>To analyse website usage patterns and trends</li>
                <li>To comply with legal obligations and protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Google Analytics and Tracking</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use Google Analytics to understand how visitors interact with our website. Google Analytics 
                collects information anonymously and reports website trends without identifying individual visitors.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Information Collected Includes:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Number of visitors and page views</li>
                <li>Duration of visits and bounce rates</li>
                <li>Geographic location (city/state level only)</li>
                <li>Device and browser information</li>
                <li>Traffic sources and referral information</li>
              </ul>
              
              <p className="text-gray-700 leading-relaxed">
                You can opt out of Google Analytics tracking by installing the 
                <a href="https://tools.google.com/dlpage/gaoptout" className="text-green-600 hover:text-green-700"> Google Analytics Opt-out Browser Add-on</a> 
                or by enabling "Do Not Track" in your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Google AdSense and Advertising</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use Google AdSense to display advertisements on our website. Google AdSense may use cookies 
                and web beacons to serve ads based on your prior visits to our website or other websites.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How AdSense Works:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Google uses cookies to serve ads based on your interests</li>
                <li>These cookies enable personalised advertising experiences</li>
                <li>You can control ad personalisation through <a href="https://adssettings.google.com" className="text-green-600 hover:text-green-700">Google's Ad Settings</a></li>
                <li>You can opt out of personalised advertising at any time</li>
              </ul>

              <p className="text-gray-700 leading-relaxed">
                Third-party vendors, including Google, may show our ads on other websites and use cookies 
                to serve ads based on your visits to our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Similar Technologies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your browsing experience, analyse site traffic, 
                and understand where our visitors are coming from.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Types of Cookies We Use:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use our website</li>
                <li><strong>Advertising Cookies:</strong> Used to show relevant advertisements</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>

              <p className="text-gray-700 leading-relaxed">
                You can control cookies through your browser settings. However, disabling certain cookies 
                may affect your ability to use some features of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations or court orders</li>
                <li>To protect our rights, property, or safety</li>
                <li>In connection with a business transfer or acquisition</li>
                <li>With trusted service providers who assist in operating our website (under strict confidentiality agreements)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organisational security measures to protect your personal 
                information against unauthorised access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Secure Socket Layer (SSL) encryption for data transmission</li>
                <li>Regular security assessments and updates</li>
                <li>Restricted access to personal information on a need-to-know basis</li>
                <li>Secure hosting and data storage practices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Your Rights and Choices</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Under Australian privacy law, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Access your personal information that we hold</li>
                <li>Request correction of inaccurate or incomplete information</li>
                <li>Request deletion of your personal information (subject to legal requirements)</li>
                <li>Opt out of marketing communications</li>
                <li>File a complaint with the Australian Privacy Commissioner</li>
              </ul>
              
              <p className="text-gray-700 leading-relaxed">
                To exercise these rights, please contact us at privacy@rubbishtips.com.au.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Third-Party Links</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites or services. We are not responsible for 
                the privacy practices or content of these external sites. We encourage you to review the privacy 
                policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website is not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13. If you are a parent or guardian and believe your 
                child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or 
                applicable laws. We will notify you of any material changes by posting the updated policy on 
                our website with a new effective date. Your continued use of our website after any changes 
                constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our handling 
                of your personal information, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@rubbishtips.com.au</p>
                <p className="text-gray-700 mb-2"><strong>Website:</strong> www.rubbishtips.com.au</p>
                <p className="text-gray-700"><strong>Response Time:</strong> We will respond to privacy-related enquiries within 30 days.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Complaints</h2>
              <p className="text-gray-700 leading-relaxed">
                If you believe we have breached your privacy rights, you can file a complaint with us first. 
                If you are not satisfied with our response, you may lodge a complaint with the Office of the 
                Australian Information Commissioner (OAIC) at www.oaic.gov.au or by calling 1300 363 992.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}