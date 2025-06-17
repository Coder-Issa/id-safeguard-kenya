
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-kenya-black mb-6">Privacy Policy</h1>

                    <p className="text-gray-600 mb-6">
                        <strong>Effective Date:</strong> 15/05/2025
                    </p>

                    <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                        <p>
                            Welcome to Recovery Kenya Id - Find & Share. We value your privacy and are committed to protecting your personal information.
                            This Privacy Policy outlines how we collect, use, and protect your data when you use our website.
                        </p>

                        <section>
                            <h2 className="text-2xl font-semibold text-kenya-black mb-4">1. Information We Collect</h2>
                            <p className="mb-3">We may collect the following types of personal information:</p>
                            <ul className="list-disc list-inside space-y-2 mb-4">
                                <li>Name, phone number, and email address</li>
                                <li>Payment details (where applicable)</li>
                                <li>Any data you voluntarily provide via forms or submissions</li>
                            </ul>
                            <p className="mb-3">We also collect anonymous technical data such as:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Device and browser type</li>
                                <li>IP address</li>
                                <li>Pages visited and time spent on the site</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-kenya-black mb-4">2. How We Use Your Information</h2>
                            <p className="mb-3">We use the information we collect to:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Process payments and transactions</li>
                                <li>Facilitate communication with users</li>
                                <li>Improve user experience and website functionality</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-kenya-black mb-4">3. Payment and No Refund Policy</h2>
                            <p className="mb-3">
                                Please note that all cash sent through our platform is final and non-refundable.
                                By completing a payment, you acknowledge and agree that:
                            </p>
                            <ul className="list-disc list-inside space-y-2 mb-4">
                                <li>Transactions are processed immediately</li>
                                <li>We do not offer refunds or reversals under any circumstances</li>
                                <li>Ensure you confirm all details carefully before proceeding with any payment</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-kenya-black mb-4">4. Sharing of Information</h2>
                            <p>
                                We do not sell or rent your personal information. We may share your data with trusted service providers who assist us in operating the website
                                (such as payment processors or email providers) under strict confidentiality agreements.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-kenya-black mb-4">5. Data Security</h2>
                            <p>
                                We take reasonable steps to protect your information from unauthorized access or disclosure. However, no system is entirely secure, and we cannot guarantee absolute
                                security of your data.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-kenya-black mb-4">6. Your Rights</h2>
                            <p className="mb-3">You have the right to:</p>
                            <ul className="list-disc list-inside space-y-2 mb-4">
                                <li>Access the personal data we hold about you</li>
                                <li>Request correction of incorrect or outdated information</li>
                                <li>Request deletion of your data, subject to legal or operational retention requirements</li>
                            </ul>
                            <p>
                                To exercise these rights, please contact us at{' '}
                                <a href="mailto:recoverykenyaid@gmail.com" className="text-kenya-green hover:underline">
                                    recoverykenyaid@gmail.com
                                </a>
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-kenya-black mb-4">7. Changes to this Policy</h2>
                            <p>
                                We may update this policy from time to time. Changes will be posted on this page with a revised effective date.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;