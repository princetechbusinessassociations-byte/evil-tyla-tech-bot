import Database from 'quick.db';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let db = null;

export async function initializeDatabase() {
  if (db) return db;
  
  try {
    db = new Database({
      filePath: join(__dirname, '../..', 'database', 'data.json')
    });
    
    // Initialize default values
    if (!db.get('blacklist')) db.set('blacklist', []);
    if (!db.get('groups')) db.set('groups', {});
    if (!db.get('users')) db.set('users', {});
    if (!db.get('warnings')) db.set('warnings', {});
    if (!db.get('notes')) db.set('notes', {});
    if (!db.get('badwords')) db.set('badwords', []);
    
    console.log('✅ Database initialized successfully');
    return db;
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase first.');
  }
  return db;
}

// User functions
export function saveUser(userId, userData) {
  const db = getDatabase();
  const users = db.get('users') || {};
  users[userId] = {
    ...users[userId],
    ...userData,
    updatedAt: new Date().toISOString(),
  };
  db.set('users', users);
}

export function getUser(userId) {
  const db = getDatabase();
  const users = db.get('users') || {};
  return users[userId] || null;
}

// Group functions
export function saveGroup(groupId, groupData) {
  const db = getDatabase();
  const groups = db.get('groups') || {};
  groups[groupId] = {
    ...groups[groupId],
    ...groupData,
    updatedAt: new Date().toISOString(),
  };
  db.set('groups', groups);
}

export function getGroup(groupId) {
  const db = getDatabase();
  const groups = db.get('groups') || {};
  return groups[groupId] || null;
}

// Warning functions
export function addWarning(userId, groupId, reason) {
  const db = getDatabase();
  const warnings = db.get('warnings') || {};
  const key = `${groupId}-${userId}`;
  
  if (!warnings[key]) {
    warnings[key] = [];
  }
  
  warnings[key].push({
    reason,
    timestamp: new Date().toISOString(),
  });
  
  db.set('warnings', warnings);
  return warnings[key].length;
}

export function getWarnings(userId, groupId) {
  const db = getDatabase();
  const warnings = db.get('warnings') || {};
  const key = `${groupId}-${userId}`;
  return warnings[key] || [];
}

export function clearWarnings(userId, groupId) {
  const db = getDatabase();
  const warnings = db.get('warnings') || {};
  const key = `${groupId}-${userId}`;
  delete warnings[key];
  db.set('warnings', warnings);
}

// Blacklist functions
export function addToBlacklist(userId) {
  const db = getDatabase();
  const blacklist = db.get('blacklist') || [];
  if (!blacklist.includes(userId)) {
    blacklist.push(userId);
    db.set('blacklist', blacklist);
  }
}

export function removeFromBlacklist(userId) {
  const db = getDatabase();
  let blacklist = db.get('blacklist') || [];
  blacklist = blacklist.filter(id => id !== userId);
  db.set('blacklist', blacklist);
}

export function isBlacklisted(userId) {
  const db = getDatabase();
  const blacklist = db.get('blacklist') || [];
  return blacklist.includes(userId);
}

// Notes/Filters functions
export function saveNote(name, content, groupId = 'global') {
  const db = getDatabase();
  const notes = db.get('notes') || {};
  
  if (!notes[groupId]) {
    notes[groupId] = {};
  }
  
  notes[groupId][name.toLowerCase()] = {
    content,
    createdAt: new Date().toISOString(),
  };
  
  db.set('notes', notes);
}

export function getNote(name, groupId = 'global') {
  const db = getDatabase();
  const notes = db.get('notes') || {};
  return notes[groupId]?.[name.toLowerCase()]?.content || null;
}

export function getNotes(groupId = 'global') {
  const db = getDatabase();
  const notes = db.get('notes') || {};
  return notes[groupId] || {};
}

export function deleteNote(name, groupId = 'global') {
  const db = getDatabase();
  const notes = db.get('notes') || {};
  
  if (notes[groupId]) {
    delete notes[groupId][name.toLowerCase()];
    db.set('notes', notes);
  }
}

export default {
  initializeDatabase,
  getDatabase,
  saveUser,
  getUser,
  saveGroup,
  getGroup,
  addWarning,
  getWarnings,
  clearWarnings,
  addToBlacklist,
  removeFromBlacklist,
  isBlacklisted,
  saveNote,
  getNote,
  getNotes,
  deleteNote,
};