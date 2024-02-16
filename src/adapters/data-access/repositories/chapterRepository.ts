import ChapterInterface from "../../../business/interfaces/chapterInterface";
import ChaptersInterface from "../../../business/interfaces/chaptersInterface";
import chapterModel from "../models/chapterModel";

export default {
  saveChapter: async (data: ChapterInterface) => {
    const chapter = new chapterModel({ ...data });
    return await chapter.save();
  },
  updateChapter: async (data: ChaptersInterface) => {
    const chapterData = await chapterModel.findOneAndUpdate(
      { _id: data.chapterId},
      {
        $set: {
          ...data,
        },
      },
      { new: true }
    );
    return chapterData;
  },
  getAllChapter: async () => {
    return await chapterModel.find().lean();
  },

};
