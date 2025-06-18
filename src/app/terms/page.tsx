import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';

export default function TermsPage() {
  return (
    <PageContainer>
      <SectionTitle>Terms of Service</SectionTitle>
      <div className="space-y-4 text-foreground/80 leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h3 className="text-xl font-semibold text-primary-foreground pt-4">1. Agreement to Terms</h3>
        <p>
          By accessing or using MOVIEBASE (the "Service"), you agree to be bound by these Terms of Service ("Terms"). 
          If you disagree with any part of the terms, then you may not access the Service.
        </p>

        <h3 className="text-xl font-semibold text-primary-foreground pt-4">2. Use of Service</h3>
        <p>
          MOVIEBASE grants you a limited, non-exclusive, non-transferable, revocable license to use the Service 
          for your personal, non-commercial use, subject to these Terms. You agree not to use the Service for any 
          other purpose, or to copy or distribute the content of the Service except as specifically permitted.
        </p>
        <p>
          You agree not to:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Use the Service in any way that violates any applicable federal, state, local, or international law or regulation.</li>
          <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm MOVIEBASE or users of the Service.</li>
          <li>Use any robot, spider, or other automatic device, process, or means to access the Service for any purpose, including monitoring or copying any of the material on the Service.</li>
          <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service, the server on which the Service is stored, or any server, computer, or database connected to the Service.</li>
        </ul>

        <h3 className="text-xl font-semibold text-primary-foreground pt-4">3. Accounts</h3>
        <p>
          When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
          Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
        </p>
        
        <h3 className="text-xl font-semibold text-primary-foreground pt-4">4. AI Recommendations</h3>
        <p>
          Our AI recommendation feature provides suggestions based on the viewing history you provide. 
          These recommendations are for entertainment purposes only and MOVIEBASE makes no guarantees regarding their accuracy or suitability.
          The viewing history you provide for AI recommendations is processed to generate these suggestions. Please refer to our Privacy Policy for details on data handling.
        </p>

        <h3 className="text-xl font-semibold text-primary-foreground pt-4">5. Intellectual Property</h3>
        <p>
          The Service and its original content (excluding content provided by users), features, and functionality are and will remain 
          the exclusive property of MOVIEBASE and its licensors. The Service is protected by copyright, trademark, and other laws of 
          both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product 
          or service without the prior written consent of MOVIEBASE.
        </p>

        <h3 className="text-xl font-semibold text-primary-foreground pt-4">6. Termination</h3>
        <p>
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, 
          including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
        </p>

        <h3 className="text-xl font-semibold text-primary-foreground pt-4">7. Limitation of Liability</h3>
        <p>
          In no event shall MOVIEBASE, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any 
          indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, 
          goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
        </p>
        
        <h3 className="text-xl font-semibold text-primary-foreground pt-4">8. Changes to Terms</h3>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, 
          we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change 
          will be determined at our sole discretion.
        </p>

        <h3 className="text-xl font-semibold text-primary-foreground pt-4">9. Contact Us</h3>
        <p>
          If you have any questions about these Terms, please contact us at: terms@moviebase.example.com
        </p>
      </div>
    </PageContainer>
  );
}
