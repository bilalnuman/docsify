import React, { useState } from "react";
import { TbUsersPlus } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { FiUsers, FiCheckCircle, FiChevronDown, FiTrash2 } from "react-icons/fi";
import { CiClock2 } from "react-icons/ci";

import DeleteModal from "../components/modal/DeleteModal";
import TeamInviteModal from "../components/modal/TeamInviteModal";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { formErrorToast, getError } from "../util/formErrorToast";
import clsx from "clsx";
import { useInviteMember, useMembers } from "../hooks/useTeam";

type Role = "admin" | "editor" | "viewer";

type Member = {
  id: number;
  name: string;
  email: string;
  verified?: boolean;
  trainingDone: number;
  trainingTotal: number;
  meetingsDone: number;
  meetingsTotal: number;
  resourcesDone: number;
  resourcesTotal: number;
  role: Role;
  lastActive: string;
};
const statsIconColors = [
  "bg-[#21C25D1A]",
  "bg-[#EF620F1A]",
  "bg-[#1556D41A]"
];
const stats = [
  { icon: <LuUsers size={24} className="text-[#21C35D]" />, label: "Active Members", value: "4/10" },
  { icon: <CiClock2 size={24} className="text-[#EF620F]" />, label: "Pending Invites", value: "23/3" },
  { icon: <AiOutlineSafetyCertificate size={24} />, label: "Compliance", value: "Total Members", color: "text-[#21C35D]" }
];


const roleStyles: Record<Role, string> = {
  admin:
    "bg-green-100 text-green-700 hover:bg-green-200 focus-visible:ring-green-300 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50",
  editor:
    "bg-amber-100 text-amber-700 hover:bg-amber-200 focus-visible:ring-amber-300 dark:bg-[#F59F0A] dark:text-white dark:hover:bg-amber-900/50",
  viewer:
    "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus-visible:ring-indigo-300 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50",
};

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]!.toUpperCase())
    .join("");

const TeamMembersListStatic: React.FC = () => {

  const { mutateAsync: updateUserRole, isPending } = useInviteMember();

  const { data, isLoading, isError, error } = useMembers()

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean | number>(false);

  const updateRole = async (id: number, role: Role) => {

    updateUserRole({ userId: id, role }, {
      onSuccess: () => {
        toast.success(`Updated user role to ${role}`);
      },
      onError: (error) => {
        formErrorToast(error)
      }
    });
  }

  const removeMember = (id: number) => {
    setOpen(id);
  };




  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white/60 dark:bg-[#2C2D34] dark:border-white/10">
        <header className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 dark:border-white/10">
          <FiUsers className="text-slate-500 dark:text-[#FFFFFF80]" />
          <h2 className="text-slate-800 dark:text-white font-semibold">Team Members</h2>
        </header>

        <div className="p-3 space-y-3">
          {isError ?
            <div className="bg-red-100 py-3 rounded-lg w-full text-center text-sm font-semibold">{getError(error)}</div> :
            isLoading ?
              <Spinner /> :
              data?.data.results.length == 0 ?
                <div className="py-4 text-center dark:text-white text-[#1D2530] text-sm font-semibold">No members found</div> :
                data?.data?.results?.map((m: Member) => (
                  <div
                    key={m.id}
                    className="rounded-xl items-center border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1A1B20] px-4 py-3 flex justify-between"
                  >
                    {/* Left */}
                    <div className="flex items-center gap-3 min-w-0 ">
                      <div className="shrink-0 w-9 h-9 rounded-full bg-[#1556D4] text-white flex items-center justify-center text-sm font-semibold">
                        {initials(m.name)}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                          <div className="flex items-center gap-1 text-slate-800 dark:text-white font-medium">
                            <span className="truncate">{m.name}</span>
                            {m.verified && <FiCheckCircle className="text-green-500" />}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 text-[12px] text-slate-600 dark:text-[#FFFFFF80]">
                            <span>Training <span className="ps-1">{m.trainingDone ?? 0}/{m.trainingTotal ?? 0}</span></span>
                            <span>•</span>
                            <span>Safety Meetings <span className="ps-1">{m.meetingsDone ?? 0}/{m.meetingsTotal ?? 0}</span></span>
                            <span>•</span>
                            <span>Resources <span className="ps-1">{m.resourcesDone ?? 0}/{m.resourcesTotal ?? 0}</span></span>
                          </div>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-white/50 truncate">{m.email}</div>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="relative inline-block">
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => !isPending && setOpenMenuId((v) => (v === m.id ? null : m.id))}
                            className={`h-8 px-3 rounded-3xl capitalize text-xs font-medium inline-flex items-center gap-1 focus:outline-none focus-visible:ring-2 ${roleStyles[m.role]}`}
                          >
                            {m.role}
                            <FiChevronDown />
                          </button>

                          {openMenuId === m.id && (
                            <div
                              className="absolute right-0 mt-1 w-36 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#2C2D34] shadow-lg z-10"
                              onMouseLeave={() => setOpenMenuId(null)}
                            >
                              {(["editor", "viewer"] as Role[]).map((r) => (
                                <button
                                  key={r}
                                  type="button"
                                  className="block w-full text-left px-3 py-2 capitalize text-sm hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-gray-100"
                                  onClick={() => {
                                    updateRole(m.id, r);
                                    setOpenMenuId(null);
                                  }}
                                >
                                  {r}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="text-xs text-slate-400 dark:text-gray-400 mt-1">
                          Last active: {m.lastActive}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeMember(m.id)}
                        className="text-red-500 hover:text-red-600"
                        title="Remove member"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
        </div>
      </section>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        onClose={() => { }}
        onConfirm={(value) => {
          // example: actually remove the member
          if (typeof value === "number") {
            // remove visually
            // setMembers((prev) => prev.filter((m) => m.id !== value));
          }
        }}
      />
    </>
  );
};

export default TeamMembersListStatic;

export const TeamMembers = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="mt-5 flex justify-between sm:flex-row flex-col gap-3">
        <div>
          <div className="text-[28px] font-semibold text-dark-default dark:text-white">Team Members</div>
          <div className="text-[#1D253080] dark:text-white/50 pt-2">Manage team access and permissions</div>
        </div>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="flex justify-center ms-auto hover:bg-blue-default/90 duration-150 items-center gap-2 font-medium text-white bg-blue-default w-[162px] h-[52px] rounded-xl"
        >
          <TbUsersPlus className="text-2xl" />
          Invite Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#2C2D34] p-4 rounded-xl flex items-center gap-3 shadow-sm border border-transparent dark:border-white/10"
          >
            <div className={clsx("text-blue-600 w-11 h-11 rounded-lg bg-[#1556D41A] flex items-center justify-center", statsIconColors[idx])}>
              {stat.icon}
            </div>
            <div>
              <p className="text-base text-[#1D253080] dark:text-[#FFFFFF80]">{stat.label}</p>
              <p className={`text-2xl font-semibold ${stat.color || "text-[#1D2530] dark:text-white"}`}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <TeamMembersListStatic />
      <TeamInviteModal open={open} setOpen={setOpen} onInvite={(data) => console.log(data)} />
    </div>
  );
};
