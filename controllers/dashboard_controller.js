const User = require('../Models/user')
const Candidate = require('../Models/candidate');
const Employee = require('../Models/employee');

const getAllMasterInfo = async (req, res, next) => {

    const totalUsersFromDb = await User.find({});

    const totalCandidatesFromDb = await Candidate.find({});

    const totalEmployeesFromDB = await Employee.find({});

    // user master info

    const totalActiveusers = totalUsersFromDb.filter(u => u.isActive).length;

    const totalInActiveusers = totalUsersFromDb.filter(u => u.isActive == false).length;

    const totalUsers = totalUsersFromDb.length;


    //candidate master info

    const totalAdminApprovedCandidsForInterviews = totalCandidatesFromDb.filter(c => c.is_candidate_approved_by_admin_for_interview).length;

    const totalInActiveCandids = totalCandidatesFromDb.filter(c => c.is_candidate_approved_by_admin_for_interview == false).length;

    const todayCreatedCandids = totalCandidatesFromDb.filter(c => new Date(c.creationDate.toString()) == new Date()).length;

    const totalCandids = totalCandidatesFromDb.length;

    //employees master info;

    const totalActiveEmployees = totalEmployeesFromDB.filter(emp => emp.isEmployee).length;

    res.status(200).json({
        totalActiveusers,
        totalUsers,
        totalAdminApprovedCandidsForInterviews,
        totalCandids,
        totalInActiveusers,
        totalInActiveCandids,
        totalActiveEmployees,
        todayCreatedCandids
    })


}

exports.getAllMasterInfo = getAllMasterInfo;