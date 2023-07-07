using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Text.Json;
using System.Text.Json.Serialization;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class UserController:ControllerBase
    {
        private readonly MyProjectDbContext bc;

        public UserController(MyProjectDbContext bc)
        {
            this.bc = bc;
        }
         [HttpGet("user/viewAdmission")]
          public async Task<IActionResult> GetAllStudents()
        {
            

            var admissions = await bc.AdmissionModels.ToListAsync();

            return Ok( admissions);
        }
       
[HttpGet("user/viewAdmission/{userId}")]
public IActionResult ViewAdmission(int userId)
{
    var admissionCourse = (from c in bc.CourseModels
                           from a in bc.AdmissionModels
                           from s in bc.StudentModels
                           where a.UserId == userId && s.StudentId == a.StudentId && c.CourseId == a.CourseId
                           select new
                           {
                               AdmissionId=a.AdmissionId,
                               FirstName = s.FirstName,
                               LastName = s.LastName,
                               Mobile = s.Mobile,
                               Age = s.Age,
                               Gender = s.Gender,
                               HouseNo = s.HouseNo,
                               StreetName=s.StreetName,
                               AreaName=s.AreaName,
                               State=s.State,
                               Pincode=s.Pincode,
                               Nationality=s.Nationality,
                               CourseId = s.CourseId,
                               FatherName = s.FatherName,
                               MotherName = s.MotherName,
                               Email = s.Email,
                               AlternateMobile = s.AlternateMobile,
                               CourseName = c.CourseName,
                               CourseDescription = c.CourseDescription,
                               CourseDuration = c.CourseDuration,
                               CourseTiming = c.CourseTiming,
                               Instituteid = c.InstituteId,
                               DateOfJoining = a.DateOfJoining,
                               EndDate = a.EndDate
                           }).ToList();

    return Ok(admissionCourse);
}                             

[HttpPost("user/addAdmission/{courseid}/{instituteid}/{userid}")]
public async Task<IActionResult> AddAdmission(StudentModel student, int courseid, int instituteid, int userid)
{
    await bc.StudentModels.AddAsync(student);
    await bc.SaveChangesAsync();
    
    var course = bc.CourseModels.Find(courseid);

    var admission = new AdmissionModel
    {
        StudentId = student.StudentId,
        CourseId = courseid,
        InstituteId = instituteid,
        UserId = userid,
        DateOfJoining = DateTime.Today, // Set the current date as the default value
        EndDate = bc.CalculateEndDate(course.CourseDuration, DateTime.Today)
    };

    bc.AdmissionModels.Add(admission);
    bc.SaveChanges();

    var options = new JsonSerializerOptions
    {
        ReferenceHandler = ReferenceHandler.Preserve
    };

    // Serialize the updated admission model
    var serializedAdmission = JsonSerializer.Serialize(admission, options);

    return Ok(serializedAdmission);
}


[HttpPut("user/editAdmission/{admissionId}")]
public async Task<IActionResult> UpdateAdmission(int admissionId, StudentModel s)
{
    var admission = bc.AdmissionModels.FirstOrDefault(a => a.AdmissionId == admissionId);
    if (admission == null)
    {
        return BadRequest("Update Not Allowed");
    }

    var st = bc.StudentModels.Find(admission.StudentId);
    if (st == null)
    {
        return BadRequest("Update Not Allowed");
    }

    st.FirstName = s.FirstName;
    st.LastName = s.LastName;
    st.Mobile = s.Mobile;
    st.Age = s.Age;
    st.Gender = s.Gender;
    st.HouseNo = s.HouseNo;
    st.StreetName = s.StreetName;
    st.AreaName = s.AreaName;
    st.State = s.State;
    st.Pincode = s.Pincode;
    st.Nationality = s.Nationality;
    st.CourseId = s.CourseId;
    st.FatherName = s.FatherName;
    st.MotherName = s.MotherName;
    st.Email = s.Email;
    st.AlternateMobile = s.AlternateMobile;

    await bc.SaveChangesAsync();

    var options = new JsonSerializerOptions
    {
        ReferenceHandler = ReferenceHandler.Preserve
    };

    // Serialize the updated admission model
    var serializedAdmission = JsonSerializer.Serialize(st, options);

    return Ok(serializedAdmission);
}
        [HttpDelete("user/deleteAdmission/{admissionId}")] 
        public async Task<IActionResult> deleteAdmission(int admissionId)
        {
            var admission = bc.AdmissionModels.FirstOrDefault(a => a.AdmissionId == admissionId);

            bc.AdmissionModels.Remove(admission);
            await bc.SaveChangesAsync();
            return Ok(admissionId);
        }
        
         [HttpGet("user/viewstatus")]
         public async Task<IActionResult>  ViewStatus(Decimal progresspercentage,int userid,int courseid)
        {
               var admission=bc.AdmissionModels.FirstOrDefault(a => a.UserId == userid && a.CourseId == courseid); 
            if(admission!=null)
            {
              
                var progress=new ProgressModel{
    
                UserId=userid,
                CourseId=admission.CourseId,
                Progresspercentage=progresspercentage, 
                Status=bc.CalculateStatus(progresspercentage,admission.EndDate),
                Timetamp=DateTime.Now
            };
            await bc.ProgressModels.AddAsync(progress);
            await Task.Run(() => bc.SaveChanges()); 
            return Ok(progress);
         }
         return NotFound();
        }



         [HttpPost("user/viewstatus")]
         public  async Task<IActionResult> ViewSatus(Decimal progresspercentage,int userid,int courseid)
    {

         var admission=bc.AdmissionModels.FirstOrDefault(a => a.UserId == userid && a.CourseId == courseid); 
            
           if(admission!=null)
           {   
            var progress=new ProgressModel{
    
            UserId=userid,
            CourseId=admission.CourseId,
            Progresspercentage=progresspercentage, 
            Status=bc.CalculateStatus(progresspercentage,admission.EndDate),
            Timetamp=DateTime.Now
        };
        await bc.ProgressModels.AddAsync(progress);
        await Task.Run(() => bc.SaveChanges()); 
        return Ok(progress);
        }
        return NotFound();
    }

        [HttpPut("user/updatestatus/{progressId}")]
public async Task<IActionResult> UpdateStatus(decimal progressPercentage, int progressId)
{
    
    var progress = bc.ProgressModels.FirstOrDefault(p => p.ProgressId == progressId);

    

    var admission = bc.AdmissionModels.FirstOrDefault(a => a.UserId == progress.UserId && a.CourseId == progress.CourseId);

    progress.Progresspercentage = progressPercentage;
    progress.Status = bc.CalculateStatus(progressPercentage, admission.EndDate);
    progress.Timetamp = DateTime.Now;

    await bc.SaveChangesAsync();

    return Ok(progress);
}


        [HttpGet("institute with rating")]
        public async Task<IActionResult> instituterating()
        {
            var instrat = await Task.Run(() =>
            {
                
              return  (from i in bc.InstituteModels
                        join r in bc.RatingModels on i.InstituteId equals r.InstituteId
                        group r by new { i.InstituteName, i.InstituteAddress ,i.ImageUrl,i.InstituteId} into g
                        select new
                        {
                            InstituteId = g.Key.InstituteId,
                            InstituteName = g.Key.InstituteName,
                            InstituteAddress = g.Key.InstituteAddress,
                            AverageRating = g.Average(r => r.Rating),
                            ImageUrl = g.Key.ImageUrl
                        }).ToList();
            });
            return Ok(instrat);

        }
                [HttpPost("RateInstitute")]

        public async Task<IActionResult> RateInstitute( RatingModel R)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                await bc.RatingModels.AddAsync(R);
                await bc.SaveChangesAsync();
                return Ok("Rating added");
            }
            catch
            {
                return StatusCode(500, "An error accoured while adding the institute.");
            }
        }
        [HttpGet("GetRatingsForInstitute/{instituteId}")]
        public IActionResult GetRatingsForInstitute(int instituteId)
        {
            var ratings = (from r in bc.RatingModels
                           join u in bc.UserModels on r.UserId equals u.UserId
                           where r.InstituteId == instituteId
                           select new
                           {
                               UserId = u.UserId,
                               Username = u.Username,
                               Rating = r.Rating,
                               Comment = r.Comments
                           }).ToList();

            return Ok(ratings);
        }

        [HttpGet("Getinstrat")]
        public async Task<IActionResult> Getinstrat()
        {

            var instcou = await Task.Run(() =>
{
    var result = from i in bc.InstituteModels
                 join r in bc.RatingModels on i.InstituteId equals r.InstituteId into ratingGroup
                 from rg in ratingGroup.DefaultIfEmpty()
                 group rg by new { i.InstituteId, i.InstituteName, i.ImageUrl, i.InstituteAddress } into g
                 select new
                 {
                     g.Key.InstituteId,
                     g.Key.InstituteName,
                     g.Key.ImageUrl,
                     g.Key.InstituteAddress,
                     AverageRating = g.Average(r => r != null ? r.Rating : 0)
                 };

                return result.ToList();
            });

            return Ok(instcou);

        }
        [HttpGet("user/viewAdmission1/{admissionId}")]
public IActionResult ViewAdmission1(int admissionId)
{
    var admissionCourse = (from c in bc.CourseModels
                           from a in bc.AdmissionModels
                           from s in bc.StudentModels
                           where a.AdmissionId == admissionId && s.StudentId == a.StudentId && c.CourseId == a.CourseId
                           select new
                           {
                               AdmissionId = a.AdmissionId,
                               FirstName = s.FirstName,
                               LastName = s.LastName,
                               Mobile = s.Mobile,
                               Age = s.Age,
                               Gender = s.Gender,
                               HouseNo = s.HouseNo,
                               StreetName = s.StreetName,
                               AreaName = s.AreaName,
                               State = s.State,
                               Pincode = s.Pincode,
                               Nationality = s.Nationality,
                               CourseId = s.CourseId,
                               FatherName = s.FatherName,
                               MotherName = s.MotherName,
                               Email = s.Email,
                               AlternateMobile = s.AlternateMobile,
                               CourseName = c.CourseName,
                               CourseDescription = c.CourseDescription,
                               CourseDuration = c.CourseDuration,
                               CourseTiming = c.CourseTiming,
                               Instituteid = c.InstituteId,
                               DateOfJoining = a.DateOfJoining,
                               EndDate = a.EndDate
                           }).ToList();

    return Ok(admissionCourse);
}

    }
}