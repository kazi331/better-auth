"use client"
import UserModal from "@/components/pages/users/UserModal";
import UsersTable from "@/components/pages/users/UsersTable";
import Container from "@/components/shared/Container";
import ErrorMessage from "@/components/shared/ErrorMessage";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import useFetch from "@/hooks/useFetch";
import { api_url } from "@/lib/api";
import { User } from "@/types";
import { useState } from "react";

export default function Uusers() {
    const { data: users, loading, error, refetch } = useFetch<User[]>(`${api_url}/users`)


    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-center">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-gray-600">Loading users...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto my-10">
                <ErrorMessage message={error} onRetry={refetch} />
            </div>
        )
    }
    return (
        <Container className="py-6">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Showing {users?.length || 0} users</p>
                <button
                    onClick={refetch}
                    className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/15 transition-colors cursor-pointer focus-visible:ring-2 ring-primary/60/60 ring-offset-2 focus:outline-0"
                >
                    Refresh
                </button>
            </div>
            <main className="my-10">
                {users && users.length > 0 ? (
                    <>
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <UsersTable users={users} onUserClick={handleUserClick} />
                        </div>

                        <UserModal isOpen={isModalOpen} onClose={handleCloseModal} user={selectedUser} />
                    </>
                ) : (
                    <div className="text-center py-12" role="status">
                        <p className="text-gray-500 text-lg">No users found.</p>
                    </div>
                )}
            </main>
        </Container>
    )
}
