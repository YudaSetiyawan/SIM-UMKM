<template>
  <b-container>
    <div class="notes-container">
      <h5 class="text-center">Notes</h5>
      <b-row>
        <!-- Form untuk menambahkan catatan baru -->
        <b-col md="12">
          <form @submit.prevent="addNote">
            <b-form-textarea v-model="newNote" placeholder="Tulis catatan baru..." rows="3" required></b-form-textarea>
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary btn-sm mt-3">Tambah Catatan</button>
            </div>
          </form>
        </b-col>

        <!-- Daftar catatan -->
        <b-col md="12">
          <ul class="list-unstyled">
            <li v-for="(note, index) in UserNotes" :key="index" class="note-item">
              <div class="note-text">{{ note }}</div>
              <button @click="deleteNote(index)" class="btn btn-danger btn-sm">Hapus</button>
            </li>
          </ul>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "UserNotesComponents",
  data() {
    return {
      newNote: "",
      UserNotes: [],
    };
  },
  methods: {
    addNote() {
      if (this.newNote.trim() !== "") {
        this.UserNotes.push(this.newNote);
        this.newNote = "";
        localStorage.setItem("notes", JSON.stringify(this.UserNotes));
      }
    },
    deleteNote(index) {
      this.UserNotes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(this.UserNotes));
    },
  },
  mounted() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      this.UserNotes = JSON.parse(savedNotes);
    }
  },
};
</script>

<style scoped>
input[type="text"],
b-form-textarea {
  width: 100%;
  padding: 10px;
}

.notes-container {
  max-width: 400px; /* Memastikan kontainer tidak terlalu lebar */
  margin: 0 auto; /* Mengatur margin untuk memusatkan kontainer */
}

.note-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.note-text {
  flex-grow: 1;
  color: blue;
  word-wrap: break-word; /* Memastikan teks panjang turun ke baris berikutnya */
}
</style>
