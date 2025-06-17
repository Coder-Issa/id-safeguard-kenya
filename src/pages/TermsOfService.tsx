
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsOfService = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-kenya-black mb-6">Terms of Service</h1>

                    <p className="text-gray-600 mb-6">
                        <strong>Effective Date:</strong> 15/05/2025
                    </p>

                    <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                        <p>
                            Welcome to ID Safeguard Kenya. These Terms of Service ("Terms") govern your use of our website and services.
                            By accessing or using our platform, you agree to be bound by these Terms.
                        </p>

                        <section>
                            <h2 className="text-2xl font-semibold text-kenya-black mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By using ID Safeguard Kenya, you confirm that you accept these Terms and that you agree to comply with them.
                                If you do not agree to these Terms, you must not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-kenya-black mb-4">2. Description of Service</h2>
                            <p className="mb-3">ID Safeguard Kenya provides:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>A platform for reporting lost identification documents</li>
                                <li>Search functionality to help locate lost IDs</li>
                                <li>Community-driven recovery assistance</li>
                                <li>Reward system for successful ID recoveries</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-kenya-black mb-4">3. User Responsibilities</h2>
                            <p className="mb-3">As a user, you agree to:</p>
                            <ul className="list-disc list-inside space-y-2 mb-4">
                                <li>Provide accurate and truthful information</li>
                                <li>Only post information about genuinely lost identification documents</li>
                                <li>Respect the privacy and rights of other users</li>
                                <li>Use the platform for legitimate purposes only</li>
                                <li>Not engage in fraudulent activities or misrepresent information</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibent text-kenya-black mb-4">4. Prohibited Activities</h2>
                            <p className="mb-3">You must not:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Use the platform for any unlawful purpose</li>
                                <li>Post false or misleading information</li>
                                <li>Attempt to gain unauthorized access to other users' accounts</li>
                                <li>Interfere with the proper functioning of the website</li>
                                <li>Use automated systems to access the platform without permission</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-kenya-black mb-4">5. Payment Terms</h2>
                            <p className="mb-3">
                                Our platform may involve financial transactions for rewards and services. Please note:
                            </p>
                            <ul className="list-disc list-inside space-y-2 mb-4">
                                <li>All payments are processed securely through trusted payment providers</li>
                                <li>Transaction fees may apply</li>
                                <li>Payments are generally non-refundable unless required by law</li>
                                <li>Users are responsible for any taxes related to payments received</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-kenya-black mb-4">6. Privacy and Data Protection</h2>
                            <p>
                                Your privacy is important to us. Please review our Privacy Policy to understand how we collect,
                                use, and protect your personal information. By using our services, you consent to the collection
                                and use of information as outlined in our Privacy Policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-kenya-black mb-4">7. Intellectual Property</h2>
                            <p>
                                The content, features, and functionality of ID Safeguard Kenya are owned by us and are protected
                                by international copyright, trademark, and other intellectual property laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-kenya-black mb-4">8. Limitation of Liability</h2>
                            <p>
                                ID Safeguard Kenya provides the platform "as is" without warranties of any kind. We are not liable
                                for any damages arising from your use of the platform, including but not limited to direct, indirect,
                                incidental, or consequential damages.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-kenya-black mb-4">9. Account Termination</h2>
                            <p>
                                We reserve the right to suspend or terminate your account at any time if you violate these Terms
                                or engage in activities that we deem harmful to the platform or other users.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-kenya-black mb-4">10. Governing Law</h2>
                            <p>
                                These Terms are governed by the laws of Kenya. Any disputes arising from these Terms or your use
                                of the platform will be subject to the jurisdiction of Kenyan courts.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-kenya-black mb-4">11. Changes to Terms</h2>
                            <p>
                                We may update these Terms from time to time. Changes will be posted on this page with a revised
                                effective date. Your continued use of the platform after changes are posted constitutes acceptance
                                of the updated Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-kenya-black mb-4">12. Contact Information</h2>
                            <p>
                                If you have any questions about these Terms, please contact us at{' '}
                                <a href="mailto:recoverykenyaid@gmail.com" className="text-kenya-green hover:underline">
                                    recoverykenyaid@gmail.com
                                </a>{' '}
                                or call us at 0759515450.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TermsOfService;