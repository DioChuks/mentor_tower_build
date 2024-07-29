const UserRole = {
  Mentee: 'MENTEE',
  Mentor: 'MENTOR',
  Admin: 'ADMIN'
}

const allRoles = {
  user: [],
  mentor: ['getMentees', 'manageMentees'],
  admin: ['getMentees', 'manageMentees', 'getMentors', 'manageMentors']
}

const roles = Object.keys(allRoles)
const roleRights = new Map(Object.entries(allRoles))

module.exports = {
  UserRole,
  roles,
  roleRights
}
