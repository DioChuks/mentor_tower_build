const Group = require('../models/Group')

class GroupService {
  async createGroup(data, ownerId) {
    const group = new Group({
        name: data.name,
        image: data.image || "",
        description: data.description,
        members: data.members || [],
        rules: data.rules,
        owner: ownerId
    });
    return group.save();
  }

  async getGroups() {
    return Group.find().exec()
  }

  async getOwnerGroups(ownerId) {
    return Group.find({owner: ownerId}).exec()
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

  async addMember(groupId, memberId) {
    // Find the group by ID
    const group = await Group.findById(groupId);

    // Check if the group was found
    if (!group) {
        throw new Error('Group not found');
    }

    // Ensure members is an array (this should be taken care of by the schema default)
    if (!Array.isArray(group.members)) {
        group.members = [];
    }

    // Check if the member is already in the group
    if (group.members.includes(memberId)) {
        throw new Error('Member is already in the group');
    }

    // If not, add the member to the group
    group.members.push(memberId);
    await group.save();

    return group;
}

  async removeMember(groupId, memberId) {
    return Group.findByIdAndUpdate(
      groupId,
      { $pull: { members: memberId } },
      { new: true }
    ).exec();
  }
}

module.exports = new GroupService()
