/** @param {import('knex').Knex} knex  */

exports.up = async (knex) => {
  // save the questions and the sugestions of the viewers
  await knex.schema
  /**
   * USERS_TABLE - get the data from the chat from each follower
   *
   * id INT
   * user_id INT
   * room_id INT
   * username STRING
   * display_name STRING
   * avatar STRING
   * followers BOOLEAN
   * follower_from DATE
   * subscriber BOOLEAN
   */
    .createTable('users', (table) => {
      table.increments();
      table.text('user_id');
      table.text('room_id');
      table.text('username');
      table.text('display_name');
      table.text('avatar');
      table.boolean('follower');
      table.text('follower_from');
    })

    /**
   * REWARDS TABLE [1:n] -> USERS_TABLE
   *
   * id INT
   * reward_id STRING
   * name_reward STRING
   * content STRING
   * created_at DATE
   * users_id INT
   */
    .createTable('rewards', (table) => {
      table.increments();
      table.text('reward_id');
      table.text('name_reward');
      table.text('content');
      table.boolean('done');
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.dateTime('created_at');
    });
};

/** @param {import('knex').Knex} knex  */
exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('rewards')
    .dropTableIfExists('users');
};
