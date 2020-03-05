import Comment from '../models/comment';

exports.createComment = async (req, res, next) => {
  try {
    const now = Date.now();
    const comment = new Comment(req.body);
    comment.createdAt = now;
    comment.updatedAt = now;
    comment.todoId = req.params.todoId;
    const saveResult = await comment.save();
    res.send(saveResult);
  } catch (err) {
    next(err);
  }
};

exports.readComments = async (req, res, next) => {
  try {
    const findResult = await Comment.find({todoId:req.params.todoId});
    res.send(findResult);
  } catch (err) {
    next(err);
  }
};

exports.readComment = async (req, res, next) => {
  try {
    const findResult = await Comment.findOne({todoId:req.params.todoId, _id:req.params.commentId});
    res.send(findResult);
  } catch (err) {
    next(err);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    req.body.updatedAt = Date.now();
    const updateResult = await Comment.findOneAndUpdate({todoId:req.params.todoId, _id:req.params.commentId}, req.body);
    const findResult = await Comment.findOne({todoId:req.params.todoId, _id:req.params.commentId});
    res.send(findResult);
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const deleteResult = await Comment.findOneAndDelete({todoId:req.params.todoId, _id:req.params.commentId});
    if (!deleteResult) {
      next(new Error(`Can't find todo`));
    } else {
      res.send({msg: 'success'});
    }
  } catch (err) {
    next(err);
  }
};
