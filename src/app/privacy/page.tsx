import PageContainer from '@/components/shared/PageContainer';
import SectionTitle from '@/components/shared/SectionTitle';

export default function PrivacyPage() {
  return (
    <PageContainer>
      <SectionTitle>Privacy Policy</SectionTitle>
      <div className="space-y-4 text-foreground/80 leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h3 className="text-xl font-semibold text-primary-foreground pt-4">1. Introduction</h3>
        <p>
          MOVIEBASE ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, 
          use, disclose, and safeguard your information when you visit our website.
        </p>

        <h3 className="text-xl font-semibold text-primary-foreground pt-4">2. Information We Collect</h3>
        <p>
          We may collect personal information that you voluntarily provide to us when you register on the website, 
          express an interest in obtaining information about us or our products and services, when you participate 
          in activities on the website, or otherwise when you contact us.
        </p>
        <p>
          The personal information that we collect depends on the context of your interactions with us and the website, 
          the choices you make, and the products and features you use. The personal information we collect may include the following:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Email address for account creation.</li>
          <li>Viewing history if you use our AI recommendation feature (this data is used solely for generating recommendations and is not stored long-term with personal identifiers unless you save it to your profile).</li>
          <li>Usage data, such as IP address, browser type, operating system, access times, and pages viewed directly before and after accessing the site.</li>
        </ul>

        <h3 className="text-xl font-semibold text-primary-foreground pt-4">3. How We Use Your Information</h3>
        <p>
          Having accurate information permits us to provide you with a smooth, efficient, and customized experience. 
          Specifically, we may use information collected about you via the website to:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Create and manage your account.</li>
          <li>Provide you with personalized movie and TV show recommendations.</li>
          <li>Improve our website and offerings.</li>
          <li>Monitor and analyze usage and trends to improve your experience with the website.</li>
          <li>Respond to user inquiries and offer support.</li>
        </ul>

        <h3 className="text-xl font-semibold text-primary-foreground pt-4">4. Disclosure of Your Information</h3>
        <p>
          We do not sell, trade, rent, or otherwise share your personal information with third parties for their marketing purposes.
          We may share information we have collected about you in certain situations, such as with third-party service providers
          that perform services for us or on our behalf, including data analysis, hosting services, and customer service.
        </p>

        <h3 className="text-xl font-semibold text-primary-foreground pt-4">5. Security of Your Information</h3>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information. 
          While we have taken reasonable steps to secure the personal information you provide to us, please be aware that 
          despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be 
          guaranteed against any interception or other type of misuse.
        </p>
        
        <h3 className="text-xl font-semibold text-primary-foreground pt-4">6. Changes to This Privacy Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
          Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h3 className="text-xl font-semibold text-primary-foreground pt-4">7. Contact Us</h3>
        <p>
          If you have questions or comments about this Privacy Policy, please contact us at: privacy@moviebase.example.com
        </p>
      </div>
    </PageContainer>
  );
}
