const { Schema, model } = require('mongoose')

const ChecklistItemSchema = new Schema(
  {
    description: {
      type: string,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
)

const ChecklistItem = model('checklistItem', ChecklistItemSchema)

module.exports = ChecklistItem