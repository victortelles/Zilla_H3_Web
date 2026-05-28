"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FaDiscord, FaSpinner } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/ui/navbar/Navbar";
import Footer from "@/components/ui/footer/Footer";
import { CommissionStatus } from "@/types/ui/statusBadge/StatusBadge.types";
import { Project } from "@/types/admin/dashboard/Admin.types";

import WelcomeBanner from "./WelcomeBanner";
import CommissionConfig from "./CommissionConfig";
import ProjectUploadForm from "./ProjectUploadForm";
import ProjectRegistry from "./ProjectRegistry";
import ConfirmModal from "@/components/ui/modal/ConfirmModal";

export default function AdminDashboard() {
  const { user, authenticated, loading, logout, showToast } = useAuth();
  const [commissionStatus, setCommissionStatus] = useState<CommissionStatus>("available");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Project inventory state
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  // Delete project modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch projects list
  const fetchProjects = useCallback(async () => {
    setIsLoadingProjects(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = (await res.json()) as Project[];
        // Sort by newest
        data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      showToast("Failed to load projects inventory.", "error");
    } finally {
      setIsLoadingProjects(false);
    }
  }, [showToast]);

  // Load config & projects if authenticated
  useEffect(() => {
    let active = true;
    if (authenticated) {
      const loadData = async () => {
        try {
          const res = await fetch("/api/config");
          if (res.ok && active) {
            const data = await res.json();
            if (data && data.commissionStatus) {
              setCommissionStatus(data.commissionStatus as CommissionStatus);
            }
          }
        } catch (err) {
          console.error("Error loading config:", err);
        }

        try {
          const res = await fetch("/api/projects");
          if (res.ok && active) {
            const data = (await res.json()) as Project[];
            data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setProjects(data);
          }
        } catch (error) {
          console.error("Error fetching projects:", error);
          if (active) showToast("Failed to load projects inventory.", "error");
        } finally {
          if (active) setIsLoadingProjects(false);
        }
      };

      loadData();
    }
    return () => {
      active = false;
    };
  }, [authenticated, showToast]);

  // Commission status update handler
  const handleUpdateStatus = async (status: CommissionStatus) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commissionStatus: status }),
      });

      if (res.ok) {
        setCommissionStatus(status);
        showToast(`Commission status updated to ${status}!`, "success");
      } else {
        showToast("Failed to update status configuration.", "error");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      showToast("Network error updating status.", "error");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Delete project handler (opens modal)
  const handleDeleteProject = (id: string, name: string) => {
    setProjectToDelete({ id, name });
    setIsDeleteModalOpen(true);
  };

  // Confirms delete action in modal
  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/projects?id=${projectToDelete.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showToast(`Project "${projectToDelete.name}" deleted.`, "success");
        setIsDeleteModalOpen(false);
        setProjectToDelete(null);
        fetchProjects();
      } else {
        showToast("Failed to delete project.", "error");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      showToast("Network error deleting project.", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  // 1. Loading credentials view
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between transition-colors duration-300">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <FaSpinner className="w-10 h-10 animate-spin text-primary" />
          <p className="font-body text-sm text-muted-foreground animate-pulse">
            Checking credentials...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  // 2. Unauthenticated view (Discord login prompt)
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between transition-colors duration-300">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-card border border-border p-8 rounded-3xl shadow-xl text-center space-y-6"
          >
            <div className="flex justify-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                <FaDiscord className="w-9 h-9" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="font-display font-black text-2xl tracking-tight text-foreground uppercase">
                Admin Panel Access
              </h1>
              <p className="font-body text-xs text-muted-foreground max-w-xs mx-auto">
                Authentication is restricted to whitelisted accounts. Connect with Discord to sign in.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="/api/auth/discord/login"
                className="w-full inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-sm font-bold text-white transition-all shadow-md active:scale-[0.98] cursor-pointer"
              >
                <FaDiscord className="w-5 h-5" /> Sign In with Discord
              </a>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  // 3. Authenticated dashboard view
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 relative">
        <WelcomeBanner user={user} onLogout={logout} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8 animate-fade-in-left">
            <CommissionConfig
              commissionStatus={commissionStatus}
              isUpdatingStatus={isUpdatingStatus}
              onUpdateStatus={handleUpdateStatus}
            />
          </div>

          <div className="lg:col-span-2 space-y-8 animate-fade-in-right">
            <ProjectUploadForm onProjectAdded={fetchProjects} />
          </div>
        </div>

        <div className="animate-fade-in-up">
          <ProjectRegistry
            projects={projects}
            isLoading={isLoadingProjects}
            onDeleteProject={handleDeleteProject}
          />
        </div>
      </main>

      <Footer />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Project"
        message={`Are you sure you want to permanently remove "${projectToDelete?.name}" from your portfolio? This action will delete the project data and its image asset.`}
        isLoading={isDeleting}
      />
    </div>
  );
}
