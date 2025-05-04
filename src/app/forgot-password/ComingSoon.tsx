import type { NextPage } from 'next';
import ComingSoonPage from './components/ComingSoonPage';

const ComingSoonHomePage: NextPage = () => {
  // Calculate a launch date 30 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

  return (
    <>
      <ComingSoonPage
        headline="Something Amazing is Brewing"
        teaserText="Our revolutionary new platform is launching soon. Get ready for a game-changing experience!"
        launchDate={launchDate.toISOString()}
        gradientStart="#4F46E5"
        gradientEnd="#7C3AED"
        socialLinks={[
          { platform: 'twitter', url: 'https://twitter.com' },
          { platform: 'linkedin', url: 'https://linkedin.com' },
          { platform: 'instagram', url: 'https://instagram.com' },
        ]}
        featuresTeaser={[
          'Lightning-fast performance',
          'Beautiful, intuitive interface',
          'Seamless integrations with your favorite tools',
          'Advanced analytics and reporting',
        ]}
      />
    </>
  );
};

export default ComingSoonHomePage;
