class User < ApplicationRecord

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  VALID_PASSWORD = /\A(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{4,100}+\z/

  # Validations
  validates:name, {presence: true}
  validates:email, {presence: true, uniqueness: true, format: {with: VALID_EMAIL_REGEX}}
  validates:password, {presence: true, format: {with: VALID_PASSWORD}, if: :confirm_pwd?}
  before_save :change_password

  has_many :likes, dependent: :destroy

  def confirm_pwd?
    self.password == self.password_confirmation
  end

  ### Encrypt password before saving to DB (password_confirmation is NOT saved to DB) ###
  def change_password
    self.password = simple_encryption(self.password)
  end

  def simple_encryption(password)
    password.bytes.map {|v| v.to_s(16)}.join
  end

  # Array of posts given user_id
  def posts
    return Post.where(user_id: self.id)
  end

  # Array of likes given user_id
  def likes
    return Like.where(user_id: self.id)
  end

  # Who are you following
  def following
    return Relationship.where(follower_id: self.id)
  end

  # By whom are you followed
  def followed
    return Relationship.where(followed_id: self.id)
  end

end
