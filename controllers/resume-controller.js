import fs from "node:fs";
import path from "node:path";
import Resume from "../models/resume.js";

// @desc    Create a new resume
// @route   POST /api/resume
// @access  Private

const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    //Default template
    const defaultResumeData = {
      profileInfo: {
        profilePreviewUrl: "",
        fullName: "",
        destination: "",
        summary: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        location: "",
        linkedIn: "",
        github: "",
        website: "",
      },
      workExperience: [
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
        },
      ],
      skills: [
        {
          name: "",
          progress: 0,
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          github: "",
          liveDemo: "",
        },
      ],
      certifications: [
        {
          title: "",
          issuer: "",
          year: "",
        },
      ],
      languages: [
        {
          name: "",
          progress: 0,
        },
      ],
      interest: [""],
    };

    const newResume = await Resume.create({
      userId: req.user._id,
      title,
      ...defaultResumeData,
    });

    res.status(201).json(newResume);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create resume",
      error: error.message,
    });
  }
};

// @desc    Get all resumes for logged-in user
// @route   GET /api/resumes
// @access  Private

const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create resume",
      error: error.message,
    });
  }
};

// @desc    Get single resume by ID
// @route   GET /api/resume/:id
// @access  Private

const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create resume",
      error: error.message,
    });
  }
};

// @desc    Update resume by ID
// @route   PUT /api/resume/:id
// @access  Private

const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found or unauthorized",
      });
    }

    //Merge updates from req.boy into existing resume

    Object.assign(resume, req.body);

    //Save updated resume
    const savedResume = await resume.save();

    res.json(savedResume);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create resume",
      error: error.message,
    });
  }
};

// @desc    Delete resume by ID
// @route   DELETE /api/resume/:id
// @access  Private

const deleteResume = async (req, res) => {};

export {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
};
