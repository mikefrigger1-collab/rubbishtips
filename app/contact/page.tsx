// app/contact/page.tsx
import { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: "Contact RubbishTips.com.au - Get in Touch",
  description: "Contact RubbishTips.com.au for questions about waste disposal facilities, site feedback, or partnership opportunities. We're here to help.",
};

export default function ContactPage() {
  const contactMethods = [
    {
      title: 'General Enquiries',
      icon: '📧',
      description: 'Questions about the website or waste disposal',
      contact: 'info@rubbishtips.com.au',
      type: 'email'
    },
    {
      title: 'Add a Location',
      icon: '📍',
      description: 'Submit a new tip or recycling centre',
      contact: 'locations@rubbishtips.com.au',
      type: 'email'
    },
    {
      title: 'Technical Support',
      icon: '💻',
      description: 'Website issues or technical problems',
      contact: 'support@rubbishtips.com.au',
      type: 'email'
    },
    {
      title: 'Partnership Opportunities',
      icon: '🤝',
      description: 'Council partnerships and collaborations',
      contact: 'partnerships@rubbishtips.com.au',
      type: 'email'
    }
  ];

  const faqs = [
    {
      question: 'How do I add a new rubbish tip to the website?',
      answer: 'Email us at locations@rubbishtips.com.au with the facility name, address, opening hours, contact details, and accepted materials. We verify all submissions before adding them to our database.'
    },
    {
      question: 'Why is the information for my local tip incorrect?',
      answer: 'We strive to keep all information current, but details can change. Please email us with the correct information and we\'ll update it promptly. Include the facility name and what needs to be corrected.'
    },
    {
      question: 'Do you cover regional areas outside capital cities?',
      answer: 'Yes! While we focus on capital cities for comprehensive coverage, we also include major regional centres and rural waste facilities. If you know of a facility we\'re missing, please let us know.'
    },
    {
      question: 'Can councils partner with RubbishTips.com.au?',
      answer: 'Absolutely. We welcome partnerships with local councils to ensure accurate information and promote responsible waste disposal. Contact our partnerships team to discuss collaboration opportunities.'
    },
    {
      question: 'Is RubbishTips.com.au affiliated with any waste companies?',
      answer: 'No, we\'re an independent directory service. We don\'t favour any particular waste management company and provide unbiased information about all types of disposal facilities.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-green-700 to-green-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              We're here to help with all your waste disposal questions
            </p>
            <p className="text-lg text-green-100 leading-relaxed max-w-3xl mx-auto">
              Whether you need help finding a facility, want to suggest improvements, 
              or have partnership enquiries, we'd love to hear from you.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Contact Methods */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the best way to reach us based on your enquiry type
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <a 
                    href={`mailto:${method.contact}`}
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                  >
                    {method.contact}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Send Us a Message</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Please select...</option>
                    <option value="general">General Enquiry</option>
                    <option value="location">Add/Update Location</option>
                    <option value="technical">Technical Issue</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Website Feedback</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Please provide as much detail as possible..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Send Message
                </button>
              </form>

              <p className="text-sm text-gray-600 mt-4 text-center">
                We typically respond to enquiries within 2-3 business days.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions about RubbishTips.com.au
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Response Time */}
        <section className="bg-green-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Response Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-green-600">2-3</div>
              <div className="text-sm text-gray-600">Business Days</div>
              <div className="text-xs text-gray-500">General Enquiries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">24</div>
              <div className="text-sm text-gray-600">Hours</div>
              <div className="text-xs text-gray-500">Technical Issues</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">1</div>
              <div className="text-sm text-gray-600">Week</div>
              <div className="text-xs text-gray-500">Location Updates</div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}