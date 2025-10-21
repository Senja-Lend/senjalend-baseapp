import { ProfileLayout } from "@/components/profile/profile-layout";
import { ProfileHeader } from "@/components/profile/profile-header";
import { UserPortfolioWrapper } from "@/components/profile/user-portfolio-wrapper";
import { WalletConnectionCard } from "@/components/profile/wallet-connection-card";

export default function ProfilePage() {
  return (
    <ProfileLayout>
      <ProfileHeader />
      <WalletConnectionCard />
      <UserPortfolioWrapper />
    </ProfileLayout>
  );
}
