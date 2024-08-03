const User = require('../Models/user')
const Candidate = require('../Models/candidate');

const getAllMasterInfo = async (req, res, next) => {

    const totalUsersFromDb = await User.find({});

    const totalCandidatesFromDb = await Candidate.find({});

    // user master info

    const totalActiveusers = totalUsersFromDb.filter(u=>u.isActive).length;

    const totalInActiveusers = totalUsersFromDb.filter(u=>u.isActive==false).length;

    const totalUsers = totalUsersFromDb.length;


    //candidate master info

    const totalActiveCandids = totalCandidatesFromDb.filter(c=>c.is_candidate_approved_by_admin_for_interview).length;

    const totalInActiveCandids = totalCandidatesFromDb.filter(c=>c.is_candidate_approved_by_admin_for_interview==false).length;

    const totalCandids = totalCandidatesFromDb.length;

    res.json({
        totalActiveusers,
        totalUsers,
        totalActiveCandids,
        totalCandids,
        totalInActiveusers,
        totalInActiveCandids
    })


}

exports.getAllMasterInfo = getAllMasterInfo;