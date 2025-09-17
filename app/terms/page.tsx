// app/terms/page.tsx
import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: "Terms of Service | RubbishTips.com.au",
  description: "Terms of service and user agreement for RubbishTips.com.au. Learn about our terms of use, disclaimers, and user responsibilities.",
};

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: {currentDate}</p>

          <div className="prose prose-lg max-w-none space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using RubbishTips.com.au ("the Website"), you accept and agree to be bound by 
                the terms and provisions of this agreement. If you do not agree to abide by these terms, 
                please do not use this website. These Terms of Service are governed by Australian law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                RubbishTips.com.au provides information about waste disposal facilities, including rubbish tips, 
                transfer stations, and recycling centres across Australia. Our website includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Directory of waste disposal facilities and drop-off locations</li>
                <li>Information about accepted materials and disposal fees</li>
                <li>Operating hours and contact details for facilities</li>
                <li>Guidelines for responsible waste disposal</li>
                <li>Interactive maps and location search functionality</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Accuracy and Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                While we strive to provide accurate and up-to-date information about waste disposal facilities, 
                operating hours, fees, and accepted materials, this information may change without notice. 
                We strongly recommend contacting facilities directly to verify current information before visiting.
              </p>
              <p className="text-gray-700 leading-relaxed">
                RubbishTips.com.au is not responsible for any inconvenience, costs, or damages caused by 
                outdated, incorrect, or incomplete information. Users rely on the information provided at their own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Responsibilities</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By using our website, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Use the website only for lawful purposes and in accordance with these terms</li>
                <li>Verify facility information before visiting any disposal location</li>
                <li>Follow all facility rules, regulations, and safety guidelines</li>
                <li>Dispose of waste responsibly and in accordance with local laws</li>
                <li>Not use the website to transmit harmful, offensive, or illegal content</li>
                <li>Respect the intellectual property rights of RubbishTips.com.au and third parties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Prohibited Uses</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not use our website:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>For any unlawful purpose or to solicit others to engage in unlawful activities</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To transmit or procure the sending of any advertising or promotional material, including "junk mail," "chain letters," "spam," or similar solicitations</li>
                <li>To impersonate or attempt to impersonate RubbishTips.com.au, our employees, another user, or any other person or entity</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The content on this website, including but not limited to text, graphics, logos, images, and software, 
                is the property of RubbishTips.com.au and is protected by Australian and international copyright laws.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You may view, download, and print content from the website for your personal, non-commercial use only. 
                You may not reproduce, distribute, modify, or create derivative works from any content without our 
                express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Content and Links</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our website may contain links to third-party websites or services that are not owned or controlled 
                by RubbishTips.com.au. We have no control over, and assume no responsibility for, the content, 
                privacy policies, or practices of any third-party websites or services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Information about waste disposal facilities is often sourced from public records, council websites, 
                and facility operators. We do not endorse or warrant the services of any particular facility.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To the fullest extent permitted by Australian law, RubbishTips.com.au shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages, including without limitation, 
                loss of profits, data, use, goodwill, or other intangible losses.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our total liability to you for all damages, losses, and causes of action shall not exceed 
                the amount you have paid us in the 12 months prior to such claim, if any.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to defend, indemnify, and hold harmless RubbishTips.com.au and its officers, directors, 
                employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, 
                costs, expenses, or fees arising out of or relating to your violation of these Terms of Service 
                or your use of the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect 
                your information when you use our website. By using our website, you agree to the collection 
                and use of information in accordance with our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Advertising and Google AdSense</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our website displays advertisements through Google AdSense and other advertising networks. 
                These advertisements are not endorsements by RubbishTips.com.au of the products or services advertised.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We are not responsible for the content of advertisements or the products/services offered by advertisers. 
                Any transactions between you and advertisers are solely between you and the advertiser.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Modifications to Service</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue any part of our website at any time 
                without notice. We shall not be liable to you or any third party for any modification, 
                suspension, or discontinuation of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We may terminate or suspend your access to our website immediately, without prior notice or 
                liability, for any reason whatsoever, including without limitation if you breach the Terms of Service. 
                Upon termination, your right to use the website will cease immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Australian Consumer Law</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nothing in these Terms of Service excludes, restricts, or modifies any guarantee, condition, 
                warranty, right, or remedy which you may have under the Competition and Consumer Act 2010 (Commonwealth) 
                or any similar state or territory legislation and which cannot be excluded, restricted, or modified.
              </p>
              <p className="text-gray-700 leading-relaxed">
                To the extent permitted by law, our liability is limited to the re-supply of the services 
                or the payment of the cost of having the services supplied again.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Governing Law and Jurisdiction</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of Australia. 
                Any disputes arising out of or in connection with these terms shall be subject to the exclusive 
                jurisdiction of the Australian courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Severability</h2>
              <p className="text-gray-700 leading-relaxed">
                If any provision of these Terms of Service is held to be invalid or unenforceable by a court, 
                the remaining provisions shall continue to be valid and enforceable. Any invalid or unenforceable 
                provision shall be deemed replaced by a valid, enforceable provision that most closely matches 
                the intent of the original provision.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms of Service at any time. 
                If a revision is material, we will try to provide at least 30 days notice prior to any new terms 
                taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> legal@rubbishtips.com.au</p>
                <p className="text-gray-700 mb-2"><strong>Website:</strong> www.rubbishtips.com.au</p>
                <p className="text-gray-700"><strong>Address:</strong> RubbishTips.com.au, Australia</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">19. Acknowledgment</h2>
              <p className="text-gray-700 leading-relaxed">
                By using RubbishTips.com.au, you acknowledge that you have read and understood these Terms of Service 
                and agree to be bound by them. These terms constitute the entire agreement between you and 
                RubbishTips.com.au regarding your use of the website.
              </p>
            </section>

          </div>

          {/* Footer notice */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                📋 Important Notice
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                These Terms of Service are designed to protect both users and RubbishTips.com.au. 
                We encourage you to read them carefully and contact us if you have any questions. 
                By continuing to use our website, you confirm your acceptance of these terms.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}