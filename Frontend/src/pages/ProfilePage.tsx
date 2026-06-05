import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { mockProfiles } from '../data/mockData';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { StatsSection } from '../components/profile/StatsSection';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Tabs } from '../components/ui/Tabs';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Edit3, ExternalLink, Star } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const profile = user ? mockProfiles[user.id] : null;
  const [activeTab, setActiveTab] = useState('about');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(profile?.name || '');
  const [editBio, setEditBio] = useState(profile?.bio || '');

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-[#64748B]">Profile not found</p>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects', count: profile.projects?.length },
    { id: 'reviews', label: 'Reviews', count: profile.reviews.length },
  ];

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
    setShowEditModal(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Profile</h1>
          <p className="text-sm text-[#64748B]">Manage your professional profile</p>
        </div>
        <Button onClick={() => setShowEditModal(true)}>
          <Edit3 size={16} />
          Edit Profile
        </Button>
      </div>

      <ProfileHeader profile={profile} isOwnProfile />

      <StatsSection stats={profile.stats} />

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'about' && (
        <Card>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#0F172A]">About</h3>
              <p className="mt-1 text-sm text-[#64748B]">{profile.bio}</p>
            </div>

            {profile.education && (
              <div>
                <h3 className="font-semibold text-[#0F172A]">Education</h3>
                <p className="mt-1 text-sm text-[#64748B]">{profile.education}</p>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-[#0F172A]">Looking For</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {profile.lookingFor.map((item) => (
                  <Badge key={item} variant="warning">{item}</Badge>
                ))}
              </div>
            </div>

            {profile.socialLinks && profile.socialLinks.length > 0 && (
              <div>
                <h3 className="font-semibold text-[#0F172A]">Links</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg bg-[#F8FAFC] px-3 py-1.5 text-xs font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0] transition-colors"
                    >
                      {link.platform}
                      <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'projects' && (
        <div className="grid gap-4 sm:grid-cols-2">
          {profile.projects?.map((project) => (
            <Card key={project.id}>
              <CardContent>
                <h3 className="font-semibold text-[#0F172A]">{project.title}</h3>
                <p className="mt-1 text-sm text-[#64748B]">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#2563EB] hover:text-[#1D4ED8]"
                  >
                    View Project <ExternalLink size={12} />
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
          {(!profile.projects || profile.projects.length === 0) && (
            <Card className="col-span-2 p-12 text-center">
              <p className="text-[#64748B]">No projects added yet</p>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-3">
          {profile.reviews.map((review) => (
            <Card key={review.id}>
              <CardContent>
                <div className="flex items-start gap-3">
                  <Avatar name={review.userName} size="md" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-[#0F172A]">{review.userName}</h4>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-[#E2E8F0]'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-[#64748B]">{review.text}</p>
                    <p className="mt-1 text-xs text-[#94A3B8]">{review.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Profile">
        <div className="space-y-4">
          <Input
            label="Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#0F172A]">Bio</label>
            <textarea
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              rows={4}
              className="flex w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] resize-none"
            />
          </div>
          <Button className="w-full" onClick={handleSaveProfile}>
            Save Changes
          </Button>
        </div>
      </Modal>
    </motion.div>
  );
}
