const Group = require('../models/Group')

class GroupService {
  async createGroup(data) {
    const group = new Group(data)
    return group.save()
  }

  async getGroups() {
    return Group.find().exec()
  }

  async getGroupById(id) {
    return Group.findById(id).exec()
  }

  async updateGroup(id, data) {
    return Group.findByIdAndUpdate(id, data, { new: true }).exec()
  }

  async deleteGroup(id) {
    return Group.findByIdAndDelete(id).exec()
  }

  async addMember(groupId, member) {
    return Group.findByIdAndUpdate(
      groupId,
      { $push: { members: member } },
      { new: true }
    ).exec()
  }

  async removeMember(groupId, memberId) {
    return Group.findByIdAndUpdate(
      groupId,
      { $pull: { members: { _id: memberId } } },
      { new: true }
    ).exec()
  }
}

module.exports = new GroupService()
